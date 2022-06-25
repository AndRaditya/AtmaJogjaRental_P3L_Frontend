<!-- Generated Card UI added here -->
<template>
	<div class="section-container section-right col-6">
		<div class="id-card-container" id="collegeCard">
			<div class="text-center subtitle-card">Generated ID Card</div>
			<div class="card-container">
				<div class="card-wrapper" id="generatedIdCard">
					<div class="user-card">
						<span class="user-photo">
							<i class="fa fa-user"></i>
						</span>
					</div>
					<div class="general-information text-right">
						<div class="card-element card-name">
							<span class="card-input" id="cardName">{{
								formData.namaLengkap
							}}</span>
						</div>
						<div class="card-element customer-id">
							<span class="card-input"> CUSTOMER </span>
						</div>
						<div class="card-element customer-id">
							<span class="card-input" id="cardIdCustomer">{{
								formData.id_customer
							}}</span>
						</div>

						<div class="card-element customer-phone">
							<span class="card-title">Mobile: </span>
							<span class="card-input" id="cardPhoneCustomer">{{
								formData.nomor_telepon_customer
							}}</span>
						</div>
						<div class="card-element customer-address">
							<span class="card-title">Address: </span>
							<span class="card-input" id="cardPhoneCustomer">{{
								formData.alamat_customer
							}}</span>
						</div>
						<div class="card-element customer-email">
							<span class="card-title">Email: </span>
							<span class="card-input" id="cardPhoneCustomer">{{
								formData.email_customer
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "GeneratedCard",
	props: {
		formData: Object,
	},
};
</script>
