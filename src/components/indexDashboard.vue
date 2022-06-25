<template>
	<section class="section-dashboard">
		<div class="hero-container">
			<div class="hero">
				<div class="hero-text-box">
					<h1 class="heading-primary">Selamat Datang!</h1>
					<h2 class="heading-secondary">
						Atma Jogja Rental Tour and Services!
					</h2>
					<p class="hero-description">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Quam saepe nemo quis, at, odit obcaecati fuga
						eligendi temporibus similique ullam sequi impedit alias
						nobis sunt omnis magnam porro sed amet!
					</p>
					<a href="#login" class="btn btn--full margin-right-sm"
						>Pesan Sekarang</a
					>
					<a href="#gallery" class="btn btn--outline"
						>Learn more &darr;</a
					>

					<div class="testimonials">
						<div class="testimonials-imgs">
							<img
								src="./Images/customers/customer-1.jpg"
								alt="Customer Photo"
							/>
							<img
								src="./Images/customers/customer-2.jpg"
								alt="Customer Photo"
							/>
							<img
								src="./Images/customers/customer-3.jpg"
								alt="Customer Photo"
							/>
							<img
								src="./Images/customers/customer-4.jpg"
								alt="Customer Photo"
							/>
							<img
								src="./Images/customers/customer-5.jpg"
								alt="Customer Photo"
							/>
							<img
								src="./Images/customers/customer-6.jpg"
								alt="Customer Photo"
							/>
						</div>
						<p class="testimonials-text">
							<span>1,000+</span> mobil tersewa!
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="gallery-container" id="gallery">
			<div class="gallery">
				<h2 class="heading-secondary">Gallery Mobil</h2>
				<div class="gallery-item">
					<figure class="gallery-img">
						<img
							src="./Images/gallery/gallery-1.webp"
							alt="Car-1"
						/>
					</figure>
					<figure class="gallery-img">
						<img
							src="./Images/gallery/gallery-2.webp"
							alt="Car-2"
						/>
					</figure>
					<figure class="gallery-img">
						<img
							src="./Images/gallery/gallery-3.webp"
							alt="Car-3"
						/>
					</figure>
					<figure class="gallery-img">
						<img
							src="./Images/gallery/gallery-4.webp"
							alt="Car-4"
						/>
					</figure>
					<figure class="gallery-img">
						<img
							src="./Images/gallery/gallery-5.webp"
							alt="Car-5"
						/>
					</figure>
					<figure class="gallery-img">
						<img
							src="./Images/gallery/gallery-6.webp"
							alt="Car-6"
						/>
					</figure>
				</div>
			</div>
		</div>

		<div class="driver-container" id="driver">
			<div class="driver">
				<div class="driver-text-box">
					<h2 class="heading-secondary">Driver yang berpengalaman</h2>
					<h3 class="heading-tertiary">
						Mulai dari <strong>Rp100.000</strong> per hari
					</h3>
					<p class="driver-text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Magnam iste, blanditiis cumque at porro reprehenderit ex
						ipsam delectus dolores facere accusantium cupiditate non
						exercitationem iusto quam iure mollitia ad vel!
					</p>
					<a href="#" class="btn btn--full">Pesan Sekarang</a>
				</div>
				<figure class="driver-img">
					<img src="./Images/Drivers-01.webp" alt="Drivers" />
				</figure>
			</div>
		</div>

		<footer class="footer-container">
			<div class="footer">
				<div class="logo-col">
					<div class="logo-container padding">
						<a href="#" class="footer-logo">
							<figure class="ajr-logo-footer">
								<img
									src="./Images/AJR_logo.png"
									alt="AJR Logo"
								/>
							</figure>
						</a>
						<h3 class="heading-tertiary logo-name">
							Atma Jogja Rental
						</h3>
					</div>
					<ul class="social-links padding">
						<li>
							<a class="footer-link" href="#">
								<ion-icon
									class="social-icon"
									name="logo-instagram"
								></ion-icon>
							</a>
						</li>
						<li>
							<a class="footer-link" href="#">
								<ion-icon
									class="social-icon"
									name="logo-facebook"
								></ion-icon>
							</a>
						</li>
						<li>
							<a class="footer-link" href="#">
								<ion-icon
									class="social-icon"
									name="logo-twitter"
								></ion-icon>
							</a>
						</li>
					</ul>

					<p class="copyright padding">
						Copyright &copy;
						<span class="year">2022</span> by Atma Jogja Rental Inc.
						All rights reserved
					</p>
				</div>
				<div class="address-col">
					<h2 class="heading-seconday contact-us padding">
						Contact Us
					</h2>
					<div class="contacts">
						<p class="address">Gedung Thomas Aquinas</p>
						<p class="address">
							<span>Jalan Babarsari 44 Yogyakarta</span>
						</p>
						<a href="tel:0274487711" class="footer-link margin-top"
							>(0274) 487711</a
						>
						<a href="email:humas@uajy.ac.id" class="footer-link"
							>humas@uajy.ac.id</a
						>
					</div>
				</div>
			</div>
		</footer>
	</section>
</template>

<style scoped>
@import "./css/indexDashboardStyle.css";
@import "./css/footerStyle.css";
</style>
