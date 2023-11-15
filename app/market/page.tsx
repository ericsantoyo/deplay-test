import React from 'react'
import NewMarketUp from '../components/market/NewMarketUp'
import NewMarketDown from '../components/market/NewMarketDown'

type Props = {}

const page = (props: Props) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NewMarketUp />
      <NewMarketDown />
    </main>
  )
}

export default page