import React from 'react';
import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import '../../styles/footer.css'
import WF from '../../../../1.png'



export const Footer = () => (

	<footer className="bg-dark text-white pb-4">
		<div className='container text-center text-md-left'>
			<div className='row text-center text-md-left'>
				<div className='col-sm-3 col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
					<a href="/home">
						<img src={WF} alt="logo" className='WF' />
					</a>
					
					<p>World's Finances: Your trusted source for financial, technology and cryptocurrency news. Stay up to date with the latest trends and discover investment opportunities in one place.</p>
				</div>
				<div className='col-sm-2 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
					<h5 className='text-uppercase mb-4 font-weight-bold text-light'>Collaborate with us</h5>
					<p>
						<a href="adversitisers" className='text-white' >Advertisers</a>
					</p>
					<p>
						<a href="suggestionbox" className='text-white' >Sugestion Box</a>
					</p>
				
				</div>
				<div className='col-sm-2 col-md-2 col-lg-2 col-xl-2  mt-3'>
					<ul className='list-group'>
						<h5>Follow Us</h5>
					
						<li className='list-group'>
							<a href="#">
								<i className='fab-fa-facebook'><BsTwitter /></i>
							</a>
						</li>
						<li className='list-group'>
							<a href="#">
								<i className='fab-fa-facebook'><BsLinkedin /></i>
							</a>
						</li>
					
					</ul>
				</div>
				<div className='col-sm-2 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
					<h5 className='text-uppercase mb-4 font-weight-bold text-light'>About us</h5>
					<p>
						<i className='fas fa-home ml-3'></i> <p>Calle Monegros 113, 43058
							</p> 
					</p>
					<p>
						<i className='fas fa-envelope ml-3'></i> <p> TheWorldFinances@</p> 
					</p>
				</div>
			</div>
			<hr className='mb-2' />
			<div className='row aling-items-center'>
				<div className='col-sm-7 col-md-7 col-lg-7 col-xl-7 '>
					<p>© 2023 Copyright all right reserved by:
						<a href="#">
							<strong className='text-info'>The World's Finances
							</strong>
						</a>
					</p>
				</div>
			</div>

		</div>

	</footer>


);
