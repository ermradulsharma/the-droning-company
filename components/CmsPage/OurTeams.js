import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Link from "next/link";
import Image from "next/image";
import { MEDIA_BASE_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";

const OurTeams = (props) => {
	let teamMember = [
		{
			name: 'Stuart Smith',
			slug: 'stuart-smith',
			designation: 'CEO and Founder',
			image: '/images/person2.png'
		},
		{
			name: 'Archie Galbraith',
			slug: 'archie-galbraith',
			designation: 'Chairman',
			image: '/images/Archie_Galbraith1.jpg'
		},
		{
			name: 'Michael Molenda',
			slug: 'michael-molenda',
			designation: 'Editor in Chief',
			image: '/images/Michael_Molenda1.jpg'
		},
		/*{
			name: 'Michael Keeper',
			slug: 'michael-keeper',
			designation: 'Chief Columnist',
			image: '/images/Michael_Keeper1.png'
		},*/
		{
			name: 'Chris Fravel',
			slug: 'chris-fravel',
			designation: 'Resident Drone Expert',
			image: '/images/chris-fravel.jpg'
		},
		{
			name: 'Akshata',
			slug: 'akshata',
			designation: 'For the latest drone tech news',
			image: `${MEDIA_BASE_URL}/${getCleanImageUrl('https://media.example.com/images/contentPage/PufrOShRxHWnKVnbeyqHDHl7nJB14Ce6pfr6Em2t.jpg')}`
		},
		{
			name: 'Ron Morgan',
			slug: 'ron-morgan',
			designation: 'Web Development & Support',
			image: '/images/ron-morgan.jpg'
		},
		{
			name: 'Sam Karp',
			slug: 'sam-karp',
			designation: 'In-House FPV Expert',
			image: '/images/sam-karp.jpg'
		}
	];
	return (
		<Aux>
			<div className="container">
				<div className="MainHeading">
					<h1>Our Team</h1>
				</div>
				<div className="row">
					{
						teamMember.filter(member => member.slug != props.currentMember).map((member, index) => {
							return <div key={`team-member-${index}`} className="col-sm-6 col-lg-4 col-xl-4">
								<Link href={`/our-team/${member.slug}`} legacyBehavior>
									<a className="single-person">
										<div className="person-image">
											<Image className="img-fluid" src={member.image} alt="person1" width={300} height={300} />
										</div>
										<div className="person-info">
											<h3 className="full-name">{member.name}</h3>
											<span className="speciality">{member.designation}</span>
										</div>
									</a>
								</Link>
							</div>
						})
					}
				</div>
			</div>
		</Aux>
	);
};

export default OurTeams;
