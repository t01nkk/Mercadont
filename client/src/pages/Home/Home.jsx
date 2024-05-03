import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React from 'react';
import SlideMostSold from '../../components/SlideMostSold/SlideMostSold.jsx';
import SlideRating from '../../components/SlideRating/SlideRating.jsx';
import SlideRecommended from '../../components/SlideRecommended/SlideRecommended';
import './Home.scss';
import banner1 from '../../media/banner1.jpg';
import banner2 from '../../media/banner2.jpg';
import banner4 from '../../media/banner4.jpg';
import PromoCard from '../../components/PromoCard.jsx/PromoCard.jsx';
import { BsCreditCard2Back } from 'react-icons/bs';
// import { TbTruck } from "react-icons/tb";
import { TiArrowSync } from 'react-icons/ti';
import { AiOutlineStar } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="color">
            <div className="div-slide-vertical">
                <Swiper
                    loop={true}
                    modules={[Navigation]}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img className="home-banner" src={banner1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="home-banner" src={banner2} alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className="home-banner" src={banner4} alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="promo-container">
                <PromoCard
                    title={t('home.promoCard.return.title')}
                    subtitle={t('home.promoCard.return.subTitle')}
                    icon={<TiArrowSync size={30} />}
                />
                <PromoCard
                    title={t('home.promoCard.cuotes.title')}
                    subtitle={t('home.promoCard.cuotes.subTitle')}
                    icon={<BsCreditCard2Back size={30} />}
                />
                <PromoCard
                    title={t('home.promoCard.delivery.title')}
                    subtitle={t('home.promoCard.delivery.subTitle')}
                    icon={<AiOutlineStar size={30} />}
                />
            </div>
            <p className="home-title-carrusel">{t('home.recommended')}</p>
            <SlideRecommended />
            <p className="home-title-carrusel">{t('home.rating')}</p>
            <SlideRating />
            <p className="home-title-carrusel">{t('home.mostSold')}</p>
            <SlideMostSold />
        </div>
    );
}
