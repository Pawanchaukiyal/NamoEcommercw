import React from 'react'
import Layout from "../../components/layout/Layout"
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import ProductCard from '../../components/ProductCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonials from '../../components/testimonials/Testimonials'


const HomePage = () => {

  return (
    <Layout>
      <HeroSection/>
      <Category/>
      <ProductCard/>
      <Track/>
      <Testimonials/>
    </Layout>
  )
}

export default HomePage