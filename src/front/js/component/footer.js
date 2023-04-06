import React from 'react';
import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import '../../styles/footer.css'
import WF from '../../../../1.png'



export const Footer = () => (

	<footer className="bg-dark text-white pt-5 pb-4">
		<div className='container text-center text-md-left'>
			<div className='row text-center text-md-left'>
				<div className='col-sm-3 col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
					<a href="/home">
						<img src={WF} alt="logo" className='WF' />
					</a>
					
					<p>World's Finances: Your trusted source for financial, technology and cryptocurrency news. Stay up to date with the latest trends and discover investment opportunities in one place.</p>
				</div>
				<div className='col-sm-2 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
					<h5 className='text-uppercase mb-4 font-weight-bold text-light'>Colaborate with us</h5>
					<p>
						<a href="#" className='text-white' >Advertisers</a>
					</p>
					<p>
						<a href="#" className='text-white' >provedores</a>
					</p>
				
				</div>
				{/* <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
					<h5 className='text-uppercase mb-4 font-weight-bold text-light'>About us</h5>
					<p>
						<a href="#" className='text-white' >Contact us</a>
					</p>
					<p>
						<a href="#" className='text-white' >provedores</a>
					</p>
					<p>
						<a href="#" className='text-white' >provedores</a>
					</p>
					<p>
						<a href="#" className='text-white' >provedores</a>
					</p>
				</div> */}
				<div className='col-sm-2 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
					<h5 className='text-uppercase mb-4 font-weight-bold text-light'>About us</h5>
					<p>
						<i className='fas fa-home mr-3'></i>Calle falsa 123, 43058
					</p>
					<p>
						<i className='fas fa-envelope mr-3'></i>TheWorldFinances@fiances.com
					</p>
					<p>
						<i className='fas fa-phone mr-3'></i>+34 611145864
					</p>
					<p>
						<i className='fas fa-print mr-3'></i>+34 999999999
					</p>
				</div>
			</div>
			<hr className='mb-4' />
			<div className='row aling-items-center'>
				<div className='col-sm-7 col-md-7 col-lg-7 col-xl-7 '>
					<p>© 2023 Copyright all right reserved by:
						<a href="#">
							<strong className='text-warning'>The World's Finances
							</strong>
						</a>
					</p>
				</div>
				<div className='col-sm-5 col-md-5 col-lg-4 col-xl-4'>
					<ul className='list-unstyled list-inline'>
						<h6>Follow Us</h6>
						<li className='list-inline-item'>
							<a href="#">
								<i className='fab-fa-facebook'><BsFacebook /></i>
							</a>
						</li>
						<li className='list-inline-item'>
							<a href="#">
								<i className='fab-fa-facebook'><BsTwitter /></i>
							</a>
						</li>
						<li className='list-inline-item'>
							<a href="#">
								<i className='fab-fa-facebook'><BsLinkedin /></i>
							</a>
						</li>
						<li className='list-inline-item'>
							<a href="#">
								<i className='fab-fa-facebook'><BsInstagram /></i>
							</a>
						</li>
					</ul>
				</div>
			</div>

		</div>

	</footer>


);
