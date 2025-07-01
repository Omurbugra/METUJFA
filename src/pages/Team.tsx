import React from 'react';
import { Mail, Circle } from 'lucide-react';

const Team: React.FC = () => {
  const curators = [
    {
      name: 'Elif Kaymaz',
      email: 'Elif@email.com',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Pelin Yoncacı Arslan',
      email: 'Pelin@email.com',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Özlem Ölçer',
      email: 'ozlem@email.com',
      photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    }
  ];

  const assistants = [
    {
      name: 'Deniz Ak',
      email: 'deniz@email.com',
      photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Hazal Yüksekkaya',
      email: 'hazal@email.com',
      photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'İlkmen Verda Azkar',
      email: 'ilkman@email.com',
      photo: 'https://images.pexels.com/photos/1181717/pexels-photo-1181717.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'İlkyaz Sarımehmetoğlu',
      email: 'ilkyaz@email.com',
      photo: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Nuri Cem Kulaksız',
      email: 'cem@email.com',
      photo: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Ömür Buğra Gündüz',
      email: 'omur@email.com',
      photo: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Şule Çekmegeli',
      email: 'sule@email.com',
      photo: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      name: 'Ufuk Tanyeri',
      email: 'ufuk@email.com',
      photo: 'https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 pt-12">
          <div className="flex justify-center mb-6">
            <div className="minimal-line"></div>
          </div>
          <h1 className="text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            Exhibition Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            The collaborative team behind META JFA's curatorial vision and archival exploration
          </p>
        </div>

        <div className="space-y-20">
          {/* Curators */}
          <section>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="minimal-line"></div>
              </div>
              <h2 className="text-3xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight">
                Curators
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {curators.map((curator, index) => (
                <div 
                  key={curator.name}
                  className="text-center fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="mb-6">
                    <img
                      src={curator.photo}
                      alt={curator.name}
                      className="team-photo mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
                    {curator.name}
                  </h3>
                  <a
                    href={`mailto:${curator.email}`}
                    className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-light tracking-wide transition-colors duration-300"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{curator.email}</span>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Curatorial Assistants */}
          <section>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="minimal-line"></div>
              </div>
              <h2 className="text-3xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight">
                Curatorial Assistants
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {assistants.map((assistant, index) => (
                <div 
                  key={assistant.name}
                  className="text-center fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4">
                    <img
                      src={assistant.photo}
                      alt={assistant.name}
                      className="team-photo mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-2 tracking-wide">
                    {assistant.name}
                  </h3>
                  <a
                    href={`mailto:${assistant.email}`}
                    className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-light tracking-wide transition-colors duration-300 text-sm"
                  >
                    <Mail className="h-3 w-3" />
                    <span>{assistant.email}</span>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Thanks Section */}
          <section className="bg-gray-50 dark:bg-gray-900 p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <Circle className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              </div>
              <h2 className="text-3xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight">
                Thanks To
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-4xl mx-auto">
              <p>
                We extend special thanks to the METU JFA Editorial Board for inviting us and for 
                opening the Journal's archives for our exploration.
              </p>
              <p>
                We are extremely grateful to Selen Tuğrul, Fırat Öter, Berfin Güzel, Elif Nur İpek, 
                Fatma İkbal Polat, Öykü Su Sezen, Eda Soyal, and Başak Ünver for their valuable contributions.
              </p>
              <p>
                We also acknowledge the generous financial support provided by Adım ODTÜ, 
                Mimarlar Derneği 1927, Koruma Uzmanları Derneği (KORDER), and METU Faculty of Architecture.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Team;