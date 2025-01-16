import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"top"} heading={"Top produtos"}/>
      <HorizontalCardProduct category={"relogios"} heading={"Relogios"}/>

      <VerticalCardProduct category={"celular"} heading={"Celulares"}/>
      <VerticalCardProduct category={"moda"} heading={"Moda"}/>
      <VerticalCardProduct category={"tv"} heading={"Televisões"}/>
      <VerticalCardProduct category={"foto"} heading={"Camera & Fotografias"}/>
      <VerticalCardProduct category={"livro"} heading={"Livros"}/>
      <VerticalCardProduct category={"tenis"} heading={"Tenis"}/>
      <VerticalCardProduct category={"moveis"} heading={"Moveis"}/>
      <VerticalCardProduct category={"tecnologia"} heading={"Tecnologia"}/>
      <VerticalCardProduct category={"esporte"} heading={"Esportivos"}/>
      <VerticalCardProduct category={"higiene"} heading={"Higiene"}/>
    </div>
  )
}

export default Home