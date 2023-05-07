import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { locationReference, typeReference } from "@/util/generalUtil";
import styled from "styled-components";

const ImageDiv = styled.div`
  max-width: 600px;
   @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;
type FacilityCardProps = {
  facility: {
    Facility_Description: string;
    Facility_ID: number;
    Facility_Name: string;
    Facility_URL: string;
    Location_Section_ID: string;
    Source_Type: string;
  };
  index: number;
};

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, index }) => {
  let img_path;
  switch (facility.Source_Type) {
    case "Att":
      img_path = `/amusement_facility/${index}.jpg`;
      break;
    default:
      img_path = "/home_img/parking.jpg";
      break;
  }

  return (
    <div className="bg-white rounded-lg  overflow-x-hidden">
      <ImageDiv>
        <LazyLoadImage
          src={facility.Facility_URL}
          width={600}
          height={270}
          alt={facility.Facility_Name}
          placeholderSrc="/logo.png"
          className="w-full h-64 object-cover rounded-lg max-w-full image"
        />
      </ImageDiv>

      <div className="px-4 py-2">
        <div>
          <h2 className="text-2xl font-bold mb-2 me-5">
            {facility.Facility_Name}
          </h2>
          <h5 className="text-2xl">({typeReference[facility.Source_Type]})</h5>
        </div>

        <p className="text-gray-700 text-lg mb-4">
          {facility.Facility_Description}
        </p>
        <div className="text-md text-gray-600">
          <p className="mb-2">
            <span className="font-bold">Facility ID:</span>{" "}
            {facility.Facility_ID}
          </p>
          <p className="mb-2">
            <span className="font-bold">Location:</span>{" "}
            {locationReference[facility.Location_Section_ID].name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
