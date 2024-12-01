import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import MenuSection from '../../components/restaurant/MenuSection'
import ReviewSection from '../../components/restaurant/ReviewSection'

function RestroTabs({restaurant}) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10">
  <TabsList>
    <TabsTrigger value="category">Category</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="category">
    <MenuSection restaurant={restaurant}/>
  </TabsContent>
  <TabsContent value="about">
    <div className='text-primary font-bold text-xl'>
        <h3 className='pt-2'>{restaurant.aboutUs}</h3>
    </div>
  </TabsContent>
  <TabsContent value="reviews">
    <ReviewSection restaurant={restaurant}/>
  </TabsContent>
</Tabs>

  )
}

export default RestroTabs