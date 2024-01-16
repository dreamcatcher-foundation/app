import Velvet from "./velvet-framework.js";

let framework = new Velvet();
framework.addRoute(() => {
		framework.content.updateStyle({
				background: "#F8F8FF"
		});
		framework.header.inject([
				/// navigation
				framework.Template.staticRow({
						width: "100%",
						height: "20px",
						stylesheet: {
								background: "transparent",
								color: "#FFF",
								justifyContent: "start",
								padding: "20px"
						},
						components: [
								/// logo and brand name container
								framework.Template.staticRow({
										width: "auto",
										height: "auto",
										stylesheet: {
												gap: "6px"
										},
										components: [
												/// logo
												framework.Template.staticImage({
														url: "../static/svg/white-logo.svg",
														stylesheet: {
																width: "20px"
														}
												}),
												/// brand name
												framework.Template.staticText({
														content: "Dreamcatcher",
												})
										]
								}),
								/// gutter
								framework.Template.staticRow({
										width: "350px"
								}),
								/// menu options container
								framework.Template.staticRow({
										stylesheet: {
												gap: "6px"
										}
								})
						]
				})
		]);
		let vignette = "linear-gradient(to bottom, transparent, transparent, transparent, #000), linear-gradient(to top, transparent, transparent, transparent, #000)";
		framework.content.inject([
				/// landing section
				framework.Template.staticSection({
						stylesheet: {
								background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(../static/jpg/robot.jpg)`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								color: "#FFF"
						},
						components: [
								/// hero section container
								framework.Template.staticColumn({
										width: "80%",
										height: "100%",
										components: [
												/// heading
												framework.Template.staticText({
														content: "Scaling Dreams, Crafting Possibilities",
														stylesheet: {
																fontSize: "7em"
														}
												}),
												/// sub heading
												framework.Template.staticText({
														content: "Deploy and manage modular, trustless and automated tokenized vaults.",
														stylesheet: {
																fontSize: "2em",
																paddingBottom: "40px"
														}
												}),
												/// learn more button
												framework.Template.button({
														content: "Learn More",
														height: "50px",
														callbackOnClick: () => {
																window.location.href = "https://dreamcatcher-1.gitbook.io/dreamcatcher/";
														}
												}),
												/// socials logo icons container
												framework.Template.staticRow({
														width: "100%",
														height: "20px",
														stylesheet: {
																paddingTop: "10px"
														},
														components: [
																/// telegram
																framework.Template.clickableImage({
																		url: "../static/png/icons/telegram.png",
																		callbackOnClick: () => {
																				window.location.href = "https://t.me/dreamcatcherprotocol";
																		},
																		stylesheet: {
																				width: "20px"
																		}
																}),
																/// discord
																framework.Template.clickableImage({
																		url: "../static/png/icons/discord.png",
																		callbackOnClick: () => {
																				window.location.href = "https://t.me/dreamcatcherprotocol";
																		},
																		stylesheet: {
																				width: "20px"
																		}
																}),
																/// twitter
																framework.Template.clickableImage({
																		url: "../static/png/icons/twitter.png",
																		callbackOnClick: () => {
																				window.location.href = "https://t.me/dreamcatcherprotocol";
																		},
																		stylesheet: {
																				width: "20px"
																		}
																})
														]
												})
										]
								})
						]
				})
		]);
});
framework.goto(0);