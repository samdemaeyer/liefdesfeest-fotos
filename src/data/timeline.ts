export interface TimelineEvent {
	id: number;
	date: string;
	title: string;
	description: string;
	image?: string;
}

export interface YearSection {
	year: string;
	events: TimelineEvent[];
}

export const timelineData: YearSection[] = [
	{
		year: "2015",
		events: [
			{
				id: 1,
				date: "23 mei 2015",
				title: "Eerste Ontmoeting",
				description:
					"Ben en Dorina ontmoeten elkaar op Gladiolen. Ze leren elkaar steeds beter kennen, ook via Snapchat.",
			},
			{
				id: 2,
				date: "1 augustus 2015",
				title: "Eerste Kus",
				description:
					"Het magische moment waarop alles begon - hun allereerste kus!",
				image: "/ons-verhaal/ons-verhaal-1.webp",
			},
			{
				id: 3,
				date: "September 2015",
				title: "Eerste keer samen naar de Kermis",
				description:
					"Ben en Dorina gaan samen naar de Kermis in Kiewit. Ze hebben een prachtige tijd en hebben veel plezier.",
				image: "/ons-verhaal/ons-verhaal-2.webp",
			},
			{
				id: 4,
				date: "December 2015",
				title: "Eerste Tripje naar Londen",
				description:
					"Hun eerste reis samen naar de prachtige stad Londen - een avontuur dat ze nooit zullen vergeten.",
				image: "/ons-verhaal/ons-verhaal-3.webp",
			},
		],
	},
	{
		year: "2016",
		events: [
			{
				id: 5,
				date: "2016",
				title: "Een “normale foto”",
				description:
					"Ben en Dorina hebben een “normale foto” gemaakt. Dit is een foto waar ze zelf niet eens in staan.",
				image: "/ons-verhaal/ons-verhaal-4.webp",
			},
			{
				id: 6,
				date: "April 2016",
				title: "Eerste Paashaasparty samen",
				description:
					"Ben en Dorina hebben hun eerste Paashaasparty samen gehad. Ze hebben een prachtige tijd en hebben veel plezier.",
				image: "/ons-verhaal/ons-verhaal-5.webp",
			},
			{
				id: 7,
				date: "Juni 2016",
				title: "Dorina studeert af in het middelbaar",
				description:
					"Dorina studeert af van het middelbaar en ze gaan samen naar haar galabal.",
				image: "/ons-verhaal/ons-verhaal-6.webp",
			},
			{
				id: 8,
				date: "Juni 2016",
				title: "Hun eerste echte reis samen naar Kroatië",
				description:
					"Ben en Dorina gaan samen naar Kroatië voor hun eerste echte reis samen.",
				image: "/ons-verhaal/ons-verhaal-7.webp",
			},
			{
				id: 9,
				date: "Augustus 2016",
				title: "Eerste Pukkelpop",
				description:
					"Het begin van een prachtige traditie - hun allereerste keer samen naar Pukkelpop!",
				image: "/ons-verhaal/ons-verhaal-8.webp",
			},
			{
				id: 10,
				date: "2016",
				title: "Via Snapchat leerden ze elkaar steeds beter kennen",
				description:
					"Via Snapchat leerden ze elkaar steeds beter kennen, daar horen natuurlijk ook filters bij.",
				image: "/ons-verhaal/ons-verhaal-9.webp",
			},
		],
	},
	{
		year: "2017",
		events: [
			{
				id: 11,
				date: "2017",
				title: "Hun gezamenlijke liefde voor katten komt op",
				description:
					"Ben en Dorina hebben een gezamenlijke liefde voor katten gevonden. Ze hebben een prachtige tijd en hebben veel plezier.",
				image: "/ons-verhaal/ons-verhaal-10.webp",
			},
			{
				id: 12,
				date: "2017",
				title: "Nieuwe traditie: jaarlijks de Paashaasparty onveilig maken",
				description:
					"Ben en Dorina hebben een nieuwe traditie opgezet: jaarlijks de Paashaasparty onveilig maken.",
				image: "/ons-verhaal/ons-verhaal-11.webp",
			},
			{
				id: 13,
				date: "2017",
				title: "Echte koppels dragen Matching zonnebrillen",
				description:
					"Ben en Dorina dragen voor het eerst Matching zonnebrillen. Ze hebben een prachtige tijd en hebben veel plezier.",
				image: "/ons-verhaal/ons-verhaal-12.webp",
			},
			{
				id: 14,
				date: "2017",
				title: "Opnieuw naar Londen en dit keer bezoeken ze ook Brighton",
				description:
					"Ben en Dorina gaan opnieuw naar Londen en dit keer bezoeken ze ook Brighton.",
				image: "/ons-verhaal/ons-verhaal-13.webp",
			},
			{
				id: 15,
				date: "Augustus 2017",
				title: "Samen naar Pukkelpop",
				description:
					"Ben en Dorina gaan samen naar Pukkelpop voor hun eerste echte reis samen.",
				image: "/ons-verhaal/ons-verhaal-14.webp",
			},
		],
	},
	{
		year: "2018",
		events: [
			{
				id: 16,
				date: "2018",
				title: "Matching zonnebrillen 2.0",
				description:
					"Ben en Dorina dragen voor het tweede jaar op een rij Matching zonnebrillen. Ze hebben een prachtige tijd en hebben veel plezier.",
				image: "/ons-verhaal/ons-verhaal-15.webp",
			},

			{
				id: 17,
				date: "Juli 2018",
				title: "Lollapalooza Parijs",
				description:
					"Een onvergetelijke reis naar Parijs voor Lollapalooza, gevolgd door een romantische trip naar Portugal.",
				image: "/ons-verhaal/ons-verhaal-16.webp",
			},
			{
				id: 18,
				date: "Juli 2018",
				title: "Na Parijs gingen we onder ons 2 door naar Portugal",
				description:
					"Ben en Dorina gaan naar Parijs voor Lollapalooza, gevolgd door een romantische trip naar Portugal.",
				image: "/ons-verhaal/ons-verhaal-18.webp",
			},
			{
				id: 19,
				date: "Augustus 2018",
				title: "Samen naar Pukkelpop",
				description:
					"Ben en Dorina gaan samen naar Pukkelpop voor hun eerste echte reis samen.",
				image: "/ons-verhaal/ons-verhaal-19.webp",
			},
			{
				id: 20,
				date: "Oktober 2018",
				title: "Eerste Huwelijksaanzoek",
				description:
					"Op de trouw van Ruben en Hanne vraagt Ben Dorina voor het eerst ten huwelijk. Ze zegt neen... nog niet de juiste tijd!",
				image: "/ons-verhaal/ons-verhaal-20.webp",
			},
		],
	},
	{
		year: "2019",
		events: [
			{
				id: 21,
				date: "Augustus 2019",
				title: "Samen naar Pukkelpop",
				description:
					"Ben en Dorina gaan samen naar Pukkelpop voor hun eerste echte reis samen.",
				image: "/ons-verhaal/ons-verhaal-22.webp",
			},
			{
				id: 22,
				date: "September 2019",
				title: "Ons eerste huisdier samen, Maurice",
				description:
					"Hun eerste huisdier samen! Maurice wordt een belangrijk onderdeel van hun gezin.",
				image: "/ons-verhaal/ons-verhaal-23.webp",
			},
			{
				id: 23,
				date: "December 2019",
				title: "Laatste dag van het jaar, de trouw van Sam & Evelien",
				description:
					"Ben en Dorina hebben de trouw van Sam & Evelien bijgewoond. Een prachtige dag om samen te vieren.",
				image: "/ons-verhaal/ons-verhaal-24.webp",
			},
		],
	},
	{
		year: "2020",
		events: [
			{
				id: 24,
				date: "Maart 2020",
				title: "COVID & Samenwonen",
				description:
					"Toen COVID uitbrak, pakte Dorina een koffer in en ging bij Ben wonen. Een bijzondere start van hun samenwonen!",
				image: "/ons-verhaal/ons-verhaal-25.webp",
			},
			{
				id: 25,
				date: "Mei 2020",
				title:
					"Eentje is eentje. Oscar komt in het gezin, de nieuwe beste vriend van Maurice",
				description:
					"Ben en Dorina krijgen een nieuwe beste vriend in het gezin, Oscar. Hij is de nieuwe beste vriend van Maurice.",
				image: "/ons-verhaal/ons-verhaal-26.webp",
			},
			{
				id: 26,
				date: "Augustus 2020",
				title: "Pukkelpop kan jammer genoeg niet doorgaan dit jaar.",
				description:
					"Pukkelpop kan jammer genoeg niet doorgaan dit jaar. Ben en Dorina moeten thuis blijven.",
				image: "/ons-verhaal/ons-verhaal-27.webp",
			},
			{
				id: 27,
				date: "Oktober 2020",
				title: "Nieuw Huis in Kiewit",
				description:
					"Ben kocht een huis in Kiewit en samen begonnen ze te renoveren - hun eerste echte thuis samen!",
				image: "/ons-verhaal/ons-verhaal-28.webp",
			},
			{
				id: 28,
				date: "November 2020",
				title:
					"De officiële verhuis! Alle laatste spullen in de auto geladen waaronder de 2 belangrijkste zaken: Oscar en Maurice.",
				description:
					"Ben en Dorina verhuizen naar Kiewit en krijgen een nieuw huis. Ze hebben een prachtige tijd en hebben veel plezier.",
				image: "/ons-verhaal/ons-verhaal-29.webp",
			},
		],
	},
	{
		year: "2021",
		events: [
			{
				id: 29,
				date: "April 2021",
				title: "Minoushe Krijgt Nieuw Thuis",
				description:
					"Toen Minoushe haar baasje verloor, gaven Ben en Dorina haar een liefdevol nieuw thuis.",
				image: "/ons-verhaal/ons-verhaal-30.webp",
			},
			{
				id: 30,
				date: "September 2021",
				title: "Eerste reis na de pandemie naar Kroatië",
				description:
					"Ben en Dorina gaan naar Kroatië voor hun eerste reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-31.webp",
			},
		],
	},
	{
		year: "2022",
		events: [
			{
				id: 31,
				date: "Augustus 2022",
				title: "Pukkelpop mag weer doorgaan!",
				description:
					"Ben en Dorina gaan naar Pukkelpop voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-32.webp",
			},
			{
				id: 32,
				date: "Augustus 2022",
				title: "Pukkelpop mag weer doorgaan!",
				description:
					"Ben en Dorina gaan naar Pukkelpop voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-33.webp",
			},
			{
				id: 33,
				date: "December 2022",
				title: "Casper en Otto",
				description:
					"Het gezin wordt nog groter! Casper en Otto komen erbij en maken het huis nog gezelliger.",
				image: "/ons-verhaal/ons-verhaal-34.webp",
			},
		],
	},
	{
		year: "2023",
		events: [
			{
				id: 34,
				date: "Juni 2023",
				title: "Samen op vakantie naar Londen",
				description:
					"Ben en Dorina gaan op vakantie naar Londen voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-36.webp",
			},
			{
				id: 35,
				date: "Augustus 2023",
				title: "Samen naar Pukkelpop",
				description:
					"Ben en Dorina gaan naar Pukkelpop voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-38.webp",
			},
			{
				id: 36,
				date: "September 2023",
				title: "Nog meer verbouwingen. Dit keer is de badkamer aan de beurt.",
				description:
					"Ben en Dorina verbouwen de badkamer en maken het huis nog gezelliger.",
				image: "/ons-verhaal/ons-verhaal-39.webp",
			},
			{
				id: 37,
				date: "September 2023",
				title: "Cleo Gevonden",
				description:
					"Tijdens verbouwingen vonden ze een katje op de parking van de Corda Campus. Cleo mag blijven!",
				image: "/ons-verhaal/ons-verhaal-40.webp",
			},
			{
				id: 38,
				date: "Oktober 2023",
				title: "Citytrip naar Berlijn",
				description:
					"Ben en Dorina gaan naar Berlijn voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-41.webp",
			},
		],
	},
	{
		year: "2024",
		events: [
			{
				id: 39,
				date: "Januari 2024",
				title: "Familie kiekje, iedereen samen op 1 foto",
				description:
					"Ben en Dorina hebben een familie kiekje gemaakt, iedereen samen op 1 foto.",
				image: "/ons-verhaal/ons-verhaal-42.webp",
			},
			{
				id: 40,
				date: "Juli 2024",
				title: "Op reis naar Frankrijk en Spanje",
				description:
					"Ben en Dorina gaan op reis naar Frankrijk en Spanje voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-43.webp",
			},
			{
				id: 41,
				date: "Augustus 2024",
				title: "Baby Lucien",
				description:
					"Jens en Katlijn vonden een kitten in hun tuin, maar konden hem niet houden. Baby Lucien komt bij hen wonen.",
				image: "/ons-verhaal/ons-verhaal-44.webp",
			},
			{
				id: 42,
				date: "Augustus 2024",
				title: "Pukkelpop blijft een jaarlijkse traditie",
				description:
					"Ben en Dorina gaan naar Pukkelpop voor hun eerste echte reis na de pandemie.",
				image: "/ons-verhaal/ons-verhaal-45.webp",
			},
			{
				id: 43,
				date: "December 2024",
				title: "Het Huwelijksaanzoek",
				description:
					"Ben vraagt Dorina ten huwelijk in het Moco Museum in Londen! Deze keer zegt ze natuurlijk ja! 💍",
				image: "/ons-verhaal/ons-verhaal-46.webp",
			},
		],
	},
	{
		year: "2025",
		events: [
			{
				id: 44,
				date: "1 augustus 2025",
				title: "Het Liefdesfeest",
				description:
					"10 jaar samen = liefdesfeest! De dag waarop Ben en Dorina hun liefde vieren met iedereen die hen dierbaar is.",
				image: "/ons-verhaal/ons-verhaal-49.webp",
			},
		],
	},
];
