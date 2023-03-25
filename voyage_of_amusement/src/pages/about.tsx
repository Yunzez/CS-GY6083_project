const About: React.FC = () => {

    // fetch('url').then(res => res.json()).then((res) => {
    //     console.log(res)
    // })
    return (
      <div className="container mx-auto h-16 mt-5">
        <h1 className="font-bold text-2xl">About Page:</h1>
        <h6>This is a project created by a group of NYU tandon students </h6>
            <h5>Fred Zhao - Full-stack engineer, Database Engineer</h5>
            <h5>Angelo Wu - Database Engineer& manager, Demon Slayer</h5>
            <h5>Patton Zhu - Database Engineer, Backend Engineer, Phily king</h5>
      </div>
    );
  };
  
  export default About;