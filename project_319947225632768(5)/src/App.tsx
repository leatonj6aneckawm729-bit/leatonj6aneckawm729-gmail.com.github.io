import { useState } from 'react';
import { PersonalInfo } from '@/components/PersonalInfo';
import { Portfolio } from '@/components/Portfolio';

function App() {
  const [currentSection, setCurrentSection] = useState<'about' | 'portfolio'>('about');

  return (
    <div className="relative">
      {currentSection === 'about' ? (
        <PersonalInfo onSectionChange={setCurrentSection} />
      ) : (
        <Portfolio onBack={() => setCurrentSection('about')} />
      )}
    </div>
  );
}

export default App;
