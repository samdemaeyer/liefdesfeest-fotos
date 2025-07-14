"use client";

import WeddingHeader from "@/components/WeddingHeader";
import FadeInView from "@/components/FadeInView";

interface TimelineEvent {
	id: number;
	date: string;
	title: string;
	description: string;
	image: string;
}

const timelineEvents: TimelineEvent[] = [
	{
		id: 1,
		date: "September 2018",
		title: "Eerste Ontmoeting",
		description:
			"Ben en Dorina ontmoetten elkaar op een zonnige dag in het park tijdens een vriendenschapsfeest. Het was liefde op het eerste gezicht!",
		image: "/placeholder-1.jpg",
	},
	{
		id: 2,
		date: "December 2018",
		title: "Eerste Kerst Samen",
		description:
			"Hun eerste kerst samen, vol warmte, laughter en de ontdekking dat ze beiden van kaneelkoekjes houden.",
		image: "/placeholder-2.jpg",
	},
	{
		id: 3,
		date: "Juli 2019",
		title: "Samen op Vakantie",
		description:
			"Een romantische vakantie naar Italië waar ze samen de zonsondergang bewonderden in Toscane.",
		image: "/placeholder-3.jpg",
	},
	{
		id: 4,
		date: "Februari 2020",
		title: "Samenwonen",
		description:
			"De grote stap! Ben en Dorina besloten samen te gaan wonen in hun eerste gedeelde appartement.",
		image: "/placeholder-4.jpg",
	},
	{
		id: 5,
		date: "Augustus 2021",
		title: "Adoptie van katten",
		description:
			"Ze verwelkomden hun lieve katten in hun gezin. Hun eerste 'baby's' samen!",
		image: "/placeholder-5.jpg",
	},
	{
		id: 6,
		date: "December 2022",
		title: "Het Huwelijksaanzoek",
		description:
			"Ben deed zijn aanzoek tijdens een winterwandeling in de besneeuwde bossen. Dorina zei natuurlijk 'JA!'",
		image: "/placeholder-6.jpg",
	},
	{
		id: 8,
		date: "Augustus 2025",
		title: "Het Liefdesfeest",
		description:
			"Vandaag vieren we hun liefde met familie en vrienden. Het begin van hun volgende hoofdstuk samen!",
		image: "/placeholder-8.jpg",
	},
];

export default function OnsVerhaalPage() {
	return (
		<div className="min-h-screen wedding-bg wedding-pattern">
			{/* Wedding Header */}
			<WeddingHeader>
				<h2 className="wedding-text text-2xl md:text-3xl font-semibold decorative-border mt-8">
					Ons Verhaal
				</h2>
			</WeddingHeader>

			{/* Timeline Section */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="relative pt-12 pb-12">
					{/* Vertical Line - Centered for both mobile and desktop */}
					<div className="absolute left-1/2 transform -translate-x-1/2 w-1 md:w-1 bg-[#841811]/30 h-full -top-6 -bottom-6"></div>

					{/* Timeline Events */}
					<div className="space-y-8 md:space-y-16">
						{timelineEvents.map((event, index) => {
							const isLeft = index % 2 === 0;

							return (
								<FadeInView
									key={event.id}
									delay={index * 80}
									duration={600}
									threshold={0.15}
									rootMargin="0px 0px -30px 0px"
								>
									{/* Mobile Layout */}
									<div className="md:hidden relative">
										{/* Mobile Timeline Dot */}
										<div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-4 h-4 bg-[#841811] rounded-full border-4 border-[#faf8f5] z-30"></div>

										{/* Mobile Card */}
										<div className="relative z-20 mx-4 mt-6">
											<div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border-2 border-[#841811]/20">
												{/* Event Image */}
												<div className="mb-4 relative h-40 rounded-lg overflow-hidden bg-[#841811]/10 flex items-center justify-center">
													<div className="text-[#841811]/40 text-5xl">📷</div>
												</div>

												{/* Event Date */}
												<div className="mb-3 text-center">
													<span className="inline-block px-3 py-1 bg-[#841811]/10 text-[#841811] rounded-full text-sm font-semibold">
														{event.date}
													</span>
												</div>

												{/* Event Title */}
												<h3 className="wedding-title text-lg font-bold mb-2 text-center">
													{event.title}
												</h3>

												{/* Event Description */}
												<p className="wedding-text text-sm leading-relaxed opacity-80 text-center">
													{event.description}
												</p>
											</div>
										</div>
									</div>

									{/* Desktop Layout */}
									<div className="hidden md:block">
										<div
											className={`relative flex items-center ${
												isLeft ? "justify-start" : "justify-end"
											}`}
										>
											{/* Timeline Dot */}
											<div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#841811] rounded-full border-4 border-[#faf8f5] z-20"></div>

											{/* Wavy Connector Line */}
											<div
												className={`absolute left-1/2 top-1/2 transform -translate-y-1/2 z-10 ${
													isLeft ? "-translate-x-full" : ""
												}`}
											>
												<svg
													width="80"
													height="20"
													viewBox="0 0 80 20"
													className="overflow-visible"
												>
													<title>Wavy Connector Line</title>
													<path
														d={
															isLeft
																? "M80 10 Q60 5 40 10 T0 10"
																: "M0 10 Q20 5 40 10 T80 10"
														}
														stroke="#841811"
														strokeWidth="2"
														fill="none"
														opacity="0.3"
													/>
												</svg>
											</div>

											{/* Event Card */}
											<div
												className={`w-5/12 ${
													isLeft ? "pr-4 text-right" : "pl-4 text-left"
												}`}
											>
												<div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-[#841811]/20 hover:border-[#841811]/40 transition-all duration-300">
													{/* Event Image */}
													<div className="mb-4 relative h-48 rounded-lg overflow-hidden bg-[#841811]/10 flex items-center justify-center">
														<div className="text-[#841811]/40 text-6xl">📷</div>
													</div>

													{/* Event Date */}
													<div className="mb-2">
														<span className="inline-block px-3 py-1 bg-[#841811]/10 text-[#841811] rounded-full text-sm font-semibold">
															{event.date}
														</span>
													</div>

													{/* Event Title */}
													<h3 className="wedding-title text-xl font-bold mb-3">
														{event.title}
													</h3>

													{/* Event Description */}
													<p className="wedding-text text-sm leading-relaxed opacity-80">
														{event.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</FadeInView>
							);
						})}
					</div>
				</div>

				{/* Final Heart */}
				<FadeInView
					delay={timelineEvents.length * 80 + 160}
					duration={700}
					threshold={0.2}
				>
					<div className="text-center mt-12 md:mt-16">
						<div className="inline-block text-5xl md:text-6xl text-[#841811] opacity-60">
							💕
						</div>
						<p className="wedding-text text-base md:text-lg mt-3 md:mt-4 italic px-4">
							En ze leefden nog lang en gelukkig...
						</p>
					</div>
				</FadeInView>
			</div>
		</div>
	);
}
