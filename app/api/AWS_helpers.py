import re
from venv import logger
import boto3
import botocore
import os
import uuid
import logging
import mimetypes

logger = logging.getLogger(__name__)

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS_IMAGE = {"png", "jpg", "jpeg", "gif"}
ALLOWED_EXTENSIONS_VIDEO = {"mov", "mp4"}

s3 = boto3.client(
    "s3",
    region_name="us-east-2",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    content_type = mimetypes.guess_type(file.filename)[0] or "application/octet-stream"
    filename = get_unique_filename(file.filename)
    try:
        logger.info(
            f"Uploading {filename} to S3 with Content-Type: {content_type} and ACL: {acl}"
        )
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            filename,
            ExtraArgs={"ACL": acl, "ContentType": content_type},
        )

        return {"url": f"{S3_LOCATION}{filename}"}

    except botocore.exceptions.ClientError as e:
        # ClientError is thrown for client-side issues or problems with AWS service
        error_code = e.response["Error"]["Code"]
        error_msg = f"S3 Error [{error_code}]: {str(e)}"
        print(f"Error uploading file to S3: {error_msg}")
        return {"errors": error_msg}

    except Exception as e:
        # Generic catch-all for any other unexpected errors
        error_msg = f"Unknown error: {str(e)}"
        print(f"Error uploading file to S3: {error_msg}")
        return {"errors": error_msg}


def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(Bucket=BUCKET_NAME, Key=key)
    except Exception as e:
        return {"errors": str(e)}
    return True
