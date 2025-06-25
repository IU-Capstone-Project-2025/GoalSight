import NavigationBar from '../components/navigation/NavigationBar';

function AboutUsPage() {
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar />
      <main>
        <div className='max-w-7xl mx-auto px-4 py-8'>
            About Us
        </div>
      </main>
    </div>
  );
}

export default AboutUsPage;