import React from 'react';

type FacilityCardProps = {
  facility: {
    Facility_Description: string;
    Facility_ID: number;
    Facility_Name: string;
    Facility_URL: string;
    Location_Section_ID: string;
    Source_Type: string;
  };
  index: number
};

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, index }) => {
    let img_path 
    switch(facility.Source_Type) {
      case "Att": img_path = `/amusement_facility/${index}.jpg`
      break;
      default: img_path = '/home_img/parking.jpg'
      break;
    }
    
    return (
    <div className="bg-white rounded-lg overflow-hidden">
    <img  src={img_path} alt={facility.Facility_Name} className="w-full h-64 object-cover" />
    <div className="px-4 py-2">
      <h2 className="text-xl font-bold mb-2">{facility.Facility_Name}</h2>
      <p className="text-gray-700 text-base">{facility.Facility_Description}</p>
      <ul className="mt-2 text-sm text-gray-600">
        <li>Facility ID: {facility.Facility_ID}</li>
        <li>Location Section ID: {facility.Location_Section_ID}</li>
        <li>Source Type: {facility.Source_Type}</li>
      </ul>
    </div>
  </div>
    
  );
};

export default FacilityCard;
