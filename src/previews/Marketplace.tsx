import Layout from "@container/Layout";
import Marketplace from "@container/Layout/Marketplace";
import React from "react";
import openseaAssetsData from "@constant/data/opensea-assets";

const MarketPlace = () => {
  return (
    <Layout>
      <Marketplace data={openseaAssetsData} />
    </Layout>
  );
};

export default MarketPlace;
