import { useState } from 'react';


const About: React.FC = () => {


  const amusementParkContent = (
    <div className="px-4 py-6 md:p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Voyage of Amusement</h1>
      <p className="text-lg mb-4">Welcome to Voyage of Amusement, the most exciting and thrilling amusement park in the world! With dozens of rides, attractions, and shows, there's something for everyone here.</p>
      <p className="text-lg mb-4">Take a ride on the rollercoaster, fly through the air on the swings, or get soaked on the water rides. And don't forget to check out our live shows and entertainment!</p>
      <p className="text-lg">At Voyage of Amusement, we're dedicated to providing the best possible experience for our guests. That's why we're always updating our park with new rides and attractions, so you can have a new adventure every time you visit.</p>
    </div>
  );

  const projectContent = (
    <div className="px-4 py-6 md:p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">About the Project</h1>
      <p className="text-lg mb-4">This website is a project built using Next.js and Azure DB. We created this site to showcase our skills in building modern, responsive web applications using the latest technologies.</p>
      <p className="text-lg mb-4">Our goal was to create a website that not only looks great, but also provides a seamless user experience. That's why we built in features like this slider, which allows you to switch between the amusement park about page and the project about page with ease.</p>
      <p className="text-lg">If you're interested in learning more about the technologies we used to build this site, or if you'd like to work with us on your own web project, please get in touch!</p>
    </div>
  );


  const [isAmusementParkVisible, setIsAmusementParkVisible] = useState(true);

  const toggleContent = () => {
    setIsAmusementParkVisible(!isAmusementParkVisible);
  };

  return (
    <div className="bg-gray-100 h-full py-[10%]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          {isAmusementParkVisible ? amusementParkContent : projectContent}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={toggleContent} className="border-2 border-gray-500 px-4 py-2 rounded-full text-gray-500 hover:bg-gray-500 hover:text-white transition-colors duration-300">
            {isAmusementParkVisible ? 'About the Project' : 'About the Amusement Park'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;