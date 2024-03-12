import "./About.css";

const AboutPage = () => {
	return (
		<div>
			<div className="about">
				<h1 className="about-title">About IndieRoll</h1>
				<p className="about-description">
					IndieRoll is a collaborative project developed by a dedicated team of
					developers. It is a platform designed to showcase independent music,
					allowing artists to share their work with a wider audience. Our
					project leverages a modern tech stack to ensure a seamless user
					experience.
				</p>
			</div>
			<div className="technologies">
				<h2 className="technology-title">Technologies Used</h2>
				<ul className="tech-list">
					<li>Flask</li>
					<li>Alembic</li>
					<li>Postgres</li>
					<li>React</li>
					<li>Vite</li>
					<li>NPM</li>
					<li>Python</li>
					<li>Redux</li>
					<li>JavaScript</li>
					<li>AWS</li>
				</ul>
			</div>
			<h2 className="contributor-title">Contributors</h2>
			<ul className="contributor-container">
				<li className="contributor">
					<div className="contributor-name">Jason Whitlock </div>
					<div className="socials">
						<a href="https://github.com/RobotAnchovi">GitHub</a>
						<a href="https://www.linkedin.com/in/whitlockjdev/">
							LinkedIn
						</a>{" "}
					</div>
				</li>
				<li className="contributor">
					<div className="contributor-name">Marisela Gomez </div>
					<div className="socials">
						<a href="https://github.com/Mar1g0m3z">GitHub</a>
						<a href="https://www.linkedin.com/in/marisela-g-881777231/">
							LinkedIn
						</a>
					</div>
				</li>
				<li className="contributor">
					<div className="contributor-name">Logan Fate </div>
					<div className="socials">
						<a href="https://github.com/LoganFate">GitHub</a>{" "}
						<a href="https://www.linkedin.com/in/logan-fate-9440402ba/">
							LinkedIn
						</a>
					</div>
				</li>
				<li className="contributor">
					<div className="contributor-name">Dwayne Walker </div>
					<div className="socials">
						<a href="https://github.com/worldofcreatives">GitHub</a>{" "}
						<a href="https://www.linkedin.com/in/ipaintidraw">LinkedIn</a>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default AboutPage;
