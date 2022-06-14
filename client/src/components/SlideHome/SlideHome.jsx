import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module


export default function SlideHome() {
    return (
        <div className="container-slider">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={false}
                effect={"coverflow"}
                autoplay={{
                    "delay": 4500,
                    "disableOnInteraction": false
                  }}
                centeredSlides={true}
                slidesPerView={1}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
                pagination={{
                    clickable: true
                }}
                className="mySwiper"
            >
                <SwiperSlide >
                    <img className='container-slider'width={"100%"} height={"400px"} src={"https://img.freepik.com/foto-gratis/estilo-vida-belleza-moda-gente-emociones-concepto-confiado-guapo-joven-exitosa-mujer-ov_1258-95122.jpg?w=2000&t=st=1655149652~exp=1655150252~hmac=9968bf14d0875ca9d1d53ade5e903f62ecbc62b0279034171092edfe97fb1dae"} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img className='container-slider'width={"100%"} height={"400px"}  src={"https://www.ipp.edu.pe/blog/wp-content/uploads/2020/09/Milano-fashion-week.jpg"} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img className='container-slider'width={"100%"} height={"400px"} src={"https://www.emagister.com/blog/wp-content/uploads/2017/04/GettyImages-940236760.jpg"} alt="" />
                </SwiperSlide>
                </Swiper>



        </div>

    )
}