<template>
  <v-main class="list" style="margin-top: 550px; margin-bottom: 40px">
    <v-container fluid fill-height class="posisinya">
      <v-layout flex align-center justify-center>
        <v-flex sm12 sm4 elevation-6>
          <v-card>
            <h1
              style="
                padding-top: 50px;
                font-family: Anton, sans-serif;
                font-size: 35px !important;
              "
            >
              Pemilik Mobil
            </h1>

            <img
              src="../Images/AJR_logo.png"
              style="width: 130px; height: 130px; margin-bottom: 25px"
            />
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Nama Lengkap</strong
                      >
                    </p>
                    <v-text-field
                      v-model="nama_pemilik_mobil"
                      :rules="namaPemilikRules"
                      required
                      filled
                      label="Masukkan Nama Lengkap"
                    ></v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Nomor KTP</strong
                      >
                    </p>
                    <v-text-field
                      v-model="no_ktp_pemilik_mobil"
                      :rules="noKTPRules"
                      required
                      filled
                      label="Masukkan Nomor KTP"
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important">Alamat</strong>
                    </p>
                    <v-text-field
                      dense
                      filled
                      v-model="alamat_pemilik_mobil"
                      :rules="alamatPemilikRules"
                      required
                      label="Masukkan Alamat"
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Nomor Telepon</strong
                      >
                    </p>
                    <v-text-field
                      filled
                      v-model="nomor_telepon_pemilik_mobil"
                      :rules="noTelpRules"
                      required
                      label="Masukkan Nomor Telepon"
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Periode Kontrak Mulai</strong
                      >
                    </p>
                    <date-picker
                      v-model="periode_kontrak_mulai_mobil"
                      valueType="format"
                    >
                    </date-picker>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Periode Kontrak Akhir</strong
                      >
                    </p>
                    <date-picker
                      v-model="periode_kontrak_akhir_mobil"
                      valueType="format"
                    >
                    </date-picker>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Tanggal Terakhir Servis</strong
                      >
                    </p>
                    <date-picker
                      v-model="tanggal_terakhir_servis_mobil"
                      valueType="format"
                    >
                    </date-picker>
                  </div>

                  <v-layout justify-center>
                    <v-btn
                      class="btn btn-primary d-block w-100 white--text"
                      @click="submit"
                      style="background: #ff7d00; margin-right: 8px"
                      name="insertPemilik"
                    >
                      Submit
                    </v-btn>
                  </v-layout>

                  <v-layout justify-center style="margin-top: 20px">
                    <v-btn @click="clear" class="grey darken-3 white--text"
                      >Clear</v-btn
                    >
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>

          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");

.posisinya {
  position: absolute;
  margin-top: 20px;
  left: 0;
  right: 0;
}
</style>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "PemilikMobil",
  components: {
    DatePicker,
  },
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      nama_pemilik_mobil: "",
      namaPemilikRules: [(v) => !!v || "Nama Lengkap tidak boleh kosong"],
      no_ktp_pemilik_mobil: "",
      noKTPRules: [(v) => !!v || "Nomor KTP tidak boleh kosong"],
      alamat_pemilik_mobil: "",
      alamatPemilikRules: [(v) => !!v || "Alamat tidak boleh kosong"],
      nomor_telepon_pemilik_mobil: "",
      noTelpRules: [(v) => !!v || "Nomor Telepon tidak boleh kosong"],
      periode_kontrak_mulai_mobil: null,
      periode_kontrak_akhir_mobil: null,
      tanggal_terakhir_servis_mobil: null,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek validasi data yang terkirim
        this.load = true;
        this.$http
          .post(this.$api + "/pemilik-mobil", {
            nama_pemilik_mobil: this.nama_pemilik_mobil,
            no_ktp_pemilik_mobil: this.no_ktp_pemilik_mobil,
            alamat_pemilik_mobil: this.alamat_pemilik_mobil,
            nomor_telepon_pemilik_mobil: this.nomor_telepon_pemilik_mobil,
            periode_kontrak_mulai_mobil: this.periode_kontrak_mulai_mobil,
            periode_kontrak_akhir_mobil: this.periode_kontrak_akhir_mobil,
            tanggal_terakhir_servis_mobil: this.tanggal_terakhir_servis_mobil,
          })
          .then((response) => {
            //simpan data id usere yang diinput
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: "Index",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
