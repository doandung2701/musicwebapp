import React from 'react';

const AppFooter = (props)=>(
	<div>
		    <div className="footer">
				<div className="footer-grid">
					<h3>Navigation</h3>
					<ul className="list1">
					  <li><a href="index.html">Home</a></li>
					  <li><a href="radio.html">All Songs</a></li>
					  <li><a href="browse.html">Albums</a></li>
					  <li><a href="radio.html">New Collections</a></li>
					  <li><a href="blog.html">Blog</a></li>
					  <li><a href="contact.html">Contact</a></li>
				    </ul>
				</div>
				<div className="footer-grid">
					<h3>Our Account</h3>
				    <ul className="list1">
					  <li><a href="#" data-toggle="modal" data-target="#myModal5">Your Account</a></li>
					  <li><a href="#">Personal information</a></li>
					  <li><a href="#">Addresses</a></li>
					  <li><a href="#">Discount</a></li>
					  <li><a href="#">Orders history</a></li>
					  <li><a href="#">Addresses</a></li>
					  <li><a href="#">Search Terms</a></li>
				    </ul>
				</div>
				<div className="footer-grid">
					<h3>Our Support</h3>
					<ul className="list1">
					  <li><a href="contact.html">Site Map</a></li>
					  <li><a href="#">Search Terms</a></li>
					  <li><a href="#">Advanced Search</a></li>
					  <li><a href="#">Mobile</a></li>
					  <li><a href="contact.html">Contact Us</a></li>
					  <li><a href="#">Mobile</a></li>
					  <li><a href="#">Addresses</a></li>
				    </ul>
				  </div>
					  <div className="footer-grid">
						<h3>Newsletter</h3>
						<p className="footer_desc">Nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat</p>
						<div className="search_footer">
						 <form>
						   <input type="text" placeholder="Email...." required=""/>
						  <input type="submit" value="Submit"/>
						  </form>
						</div>
					 </div>
					 <div className="footer-grid footer-grid_last">
						<h3>About Us</h3>
						<p className="footer_desc">Diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat enim ad minim veniam,.</p>
						<p className="f_text">Phone:  &nbsp;&nbsp;&nbsp;00-250-2131</p>
						<p className="email">Email : &nbsp;<span><a href="mailto:mail@example.com">info(at)mailing.com</a></span></p>	
					 </div>
					 <div className="clearfix"> </div>
				</div>
			<footer>
			   <p>&copy 2016 Mosaic. All Rights Reserved | Design by <a href="https://w3layouts.com/" target="_blank">w3layouts.</a></p>
			</footer>
			</div>
)

export default AppFooter;