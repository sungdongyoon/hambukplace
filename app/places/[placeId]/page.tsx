import React from "react";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = await params;

  return <div>매장 상세 페이지 {placeId}</div>;
};

export default PlacePage;
