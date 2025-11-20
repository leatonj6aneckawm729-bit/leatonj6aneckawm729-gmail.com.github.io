import { useState, useEffect } from 'react';
import { Gamepad2, Users, Play, Code, Palette, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import '@/styles/water-animations.css';
// 导入存在的压缩后图片资源
import negotiation1 from '@/assets/compressed_negotiation-new-1.png';
import negotiation5 from '@/assets/compressed_negotiation-new-5.png';
import negotiation6 from '@/assets/compressed_negotiation-new-6.png';

// 导入存在的压缩后的 Qi Shiyi And Tang Si 游戏图片
import qishiTangsi1 from '@/assets/compressed_qishi-tangsi-1.png';
import qishiTangsi5 from '@/assets/compressed_qishi-tangsi-5.png';
import qishiTangsi6 from '@/assets/compressed_qishi-tangsi-6.png';

interface GameProject {
  id: string;
  title: string;
  genre: string;
  description: string;
  platforms: string[];
  technologies: string[];
  role: string;
  teamSize: number;
  features: string[];
}

export const GameDesign: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [negotiationImageIndex, setNegotiationImageIndex] = useState(0);
  const [qishiTangsiImageIndex, setQishiTangsiImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // 使用导入的图片资源
  const negotiationImages = [
    negotiation1,
    negotiation5,
    negotiation6
  ];

  // Qi Shiyi And Tang Si 游戏图片
  const qishiTangsiImages = [
    qishiTangsi1,
    qishiTangsi5,
    qishiTangsi6
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedGame === '1') {
      const interval = setInterval(() => {
        setNegotiationImageIndex((prev) => (prev + 1) % negotiationImages.length);
      }, 10000); // 改为10秒轮播
      return () => clearInterval(interval);
    }
  }, [selectedGame]);

  useEffect(() => {
    if (selectedGame === '2') {
      const interval = setInterval(() => {
        setQishiTangsiImageIndex((prev) => (prev + 1) % qishiTangsiImages.length);
      }, 10000); // 改为10秒轮播
      return () => clearInterval(interval);
    }
  }, [selectedGame]);

  const nextNegotiationImage = () => {
    setNegotiationImageIndex((prev) => (prev + 1) % negotiationImages.length);
  };

  const prevNegotiationImage = () => {
    setNegotiationImageIndex((prev) => (prev - 1 + negotiationImages.length) % negotiationImages.length);
  };

  const nextQishiImage = () => {
    setQishiTangsiImageIndex((prev) => (prev + 1) % qishiTangsiImages.length);
  };

  const prevQishiImage = () => {
    setQishiTangsiImageIndex((prev) => (prev - 1 + qishiTangsiImages.length) % qishiTangsiImages.length);
  };

  const gameProjects: GameProject[] = [
    {
      id: '1',
      title: 'Negotiation',
      genre: 'Text-based Narrative Games',
      description: 'Negotiation is a text-based game, centered on the work of a police crisis negotiator.The player takes the role of Officer Richard, who must negotiate with an armed suspect holding a hostage, and ultimately secure the hostage\'s safety.',
      platforms: ['PC'],
      technologies: ['Unity','Fungus'],
      role: 'Sole developer, designer, writer, and producer of the game',
      teamSize: 1,
      features: [
        '1 hour of gameplay',
        'Branching storylines',
        'Negotiation strategies'
      ]
    },
    {
      id: '2',
      title: 'Qi Shiyi And Tang Si',
      genre: 'Game Mod',
      description: "Tang Si & Qi Shiyi Mod is a medium-sized narrative expansion that brings fresh elements of Chinese culture, new characters, and original gameplay systems into the world of The Sultan's Game.",
      platforms: ['PC'],
      technologies: ["Game Engine of The Sultan's Game"],
      role: 'Sole developer, designer, writer, and producer of the game mod',
      teamSize: 1,
      features: [
        '8+ alternative endings',
        'Chinese elements',
        'New equipments and characters',
        'New affinity system'
      ]
    }
  ];

  const getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      'RPG': 'from-purple-400 to-pink-500',
      'Puzzle': 'from-blue-400 to-cyan-500',
      'Adventure': 'from-green-400 to-emerald-500',
      'Strategy': 'from-yellow-400 to-orange-500',
      'Programming': 'from-red-400 to-rose-500',
      'Rhythm': 'from-pink-400 to-rose-500'
    };

    for (const [key, value] of Object.entries(colors)) {
      if (genre.includes(key)) return value;
    }
    return 'from-gray-400 to-slate-500';
  };

  
  return (
    <div className="space-y-8">
      {/* 头部标题 */}
      <div className={`text-center mb-8 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } smooth-transition-slow`}>
        <h2 className="text-4xl font-bold gradient-text mb-4">Game Design Portfolio</h2>
        <p className="text-gray-600 text-lg">Interactive experiences that push the boundaries of gameplay and storytelling</p>
      </div>

      {/* 特色游戏展示 */}
      {selectedGame && (
        <div className={`glass-effect rounded-2xl p-6 soft-shadow-lg smooth-transition ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          animationDelay: '0.3s',
          animation: mounted ? 'slide-in-up 0.6s ease-out 0.3s both' : 'none'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-white rounded-2xl relative overflow-hidden shadow-inner p-3">
              {selectedGame === '1' ? (
                // Negotiation 游戏展示
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-sm border border-blue-300 p-4">
                  {isVideoPlaying ? (
                    // 视频播放器
                    <div className="relative w-full h-full">
                      <video
                        className="w-full h-full rounded-lg"
                        controls
                        autoPlay
                        onError={(e) => {
                          console.error('视频加载失败:', e);
                          setIsVideoPlaying(false);
                        }}
                      >
                        <source src="https://agent-statics-tc.nuwax.com/tmp/afb2a716e76e497abe72500cfb8082fe.mp4" type="video/mp4" />
                        您的浏览器不支持视频播放。
                      </video>
                      {/* 关闭视频按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVideoPlaying(false);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 smooth-transition"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    // 图片轮播
                    <>
                      <img
                        src={negotiationImages[negotiationImageIndex]}
                        alt={`Negotiation Game Screenshot ${negotiationImageIndex + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                        style={{
                          objectFit: 'contain',
                          maxHeight: '100%',
                          maxWidth: '100%'
                        }}
                      />

                      {/* 图片导航按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevNegotiationImage();
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400 smooth-transition border-2 border-white/30"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextNegotiationImage();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400 smooth-transition border-2 border-white/30"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>

                      {/* 图片指示器 */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {negotiationImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setNegotiationImageIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full smooth-transition border-2 border-white/50 ${
                              index === negotiationImageIndex
                                ? 'bg-blue-400 w-8 border-white'
                                : 'bg-white/30 hover:bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : selectedGame === '2' ? (
                // Qi Shiyi And Tang Si 游戏图片轮播
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-sm border border-orange-300 p-4">
                  <img
                    src={qishiTangsiImages[qishiTangsiImageIndex]}
                    alt={`Qi Shiyi And Tang Si Screenshot ${qishiTangsiImageIndex + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                    style={{
                      objectFit: 'contain',
                      maxHeight: '100%',
                      maxWidth: '100%'
                    }}
                    onError={(e) => {
                      // 如果图片加载失败，显示游戏图标
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />

                  {/* 备用占位符 */}
                  <div className="absolute inset-0 flex items-center justify-center hidden">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl hover-lift smooth-transition">
                        <Gamepad2 className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-gray-800 font-semibold text-lg mb-2">Qi Shiyi And Tang Si</p>
                      <p className="text-gray-600">Game Preview</p>
                    </div>
                  </div>

                  {/* 图片导航按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevQishiImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-orange-400 smooth-transition border-2 border-white/30"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextQishiImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-orange-400 smooth-transition border-2 border-white/30"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>

                  {/* 图片指示器 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {qishiTangsiImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQishiTangsiImageIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full smooth-transition border-2 border-white/50 ${
                          index === qishiTangsiImageIndex
                            ? 'bg-orange-400 w-8 border-white'
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // 其他游戏的占位符
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl hover-lift smooth-transition">
                      <Gamepad2 className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-gray-800 font-semibold text-lg mb-2">Game Preview</p>
                    <p className="text-gray-600">
                      {gameProjects.find(g => g.id === selectedGame)?.title}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {gameProjects.find(g => g.id === selectedGame)?.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {gameProjects.find(g => g.id === selectedGame)?.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Genre</div>
                  <div className="font-semibold text-gray-800">
                    {gameProjects.find(g => g.id === selectedGame)?.genre}
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Platforms</div>
                  <div className="font-semibold text-gray-800">
                    {gameProjects.find(g => g.id === selectedGame)?.platforms.join(', ')}
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Team Size</div>
                  <div className="font-semibold text-gray-800">
                    {gameProjects.find(g => g.id === selectedGame)?.teamSize} developers
                  </div>
                </div>
                              </div>

              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover-lift smooth-transition ripple-effect"
                >
                  <Play className="w-4 h-4 mr-2 inline-block" />
                  Watch Now
                </button>
                <a
                  href={selectedGame === '2'
                    ? "https://steamcommunity.com/profiles/76561199220388977/myworkshopfiles/?appid=3117820"
                    : "https://drive.google.com/drive/folders/1CzZthndoIAz1ce_T2H_-J-pJbNmP39DI?usp=drive_link"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover-lift smooth-transition ripple-effect border border-white/40 inline-flex items-center hover:bg-white/80"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download and Play
                </a>
              </div>
            </div>
          </div>

          {/* 游戏特性 */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Game Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameProjects.find(g => g.id === selectedGame)?.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 游戏网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameProjects.map((game, index) => (
          <div
            key={game.id}
            className={`glass-effect rounded-2xl overflow-hidden hover-lift soft-shadow ripple-effect cursor-pointer smooth-transition ${
              mounted ? 'opacity-100' : 'opacity-0'
            } ${selectedGame === game.id ? 'ring-2 ring-indigo-500/50' : ''}`}
            style={{
              animationDelay: mounted ? `${0.4 + index * 0.08}s` : '0s',
              animation: mounted ? `slide-in-up 0.6s ease-out ${0.4 + index * 0.08}s both` : 'none'
            }}
            onClick={() => setSelectedGame(game.id)}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            {/* 游戏预览区域 */}
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-white relative overflow-hidden group">
              {game.id === '1' ? (
                // Negotiation 游戏选项卡显示第一张图片
                <img
                  src={negotiationImages[0]}
                  alt="Negotiation Game"
                  className="w-full h-full object-cover"
                />
              ) : game.id === '2' ? (
                // Qi Shiyi And Tang Si 游戏选项卡显示第一张图片
                <img
                  src={qishiTangsiImages[0]}
                  alt="Qi Shiyi And Tang Si Game"
                  className="w-full h-full object-cover"
                />
              ) : (
                // 其他游戏的默认图标
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`relative transition-transform duration-300 ${
                      hoveredGame === game.id ? 'scale-110' : ''
                    }`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Gamepad2 className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 悬停覆盖层 */}
              <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 smooth-transition flex items-center justify-center ${
                hoveredGame === game.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 text-gray-800 ml-1" />
                </div>
              </div>

              {/* 类型标签 */}
              <div className="absolute top-3 right-3">
                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getGenreColor(game.genre)} text-white text-xs font-medium`}>
                  {game.genre}
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* 游戏信息 */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">{game.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{game.description}</p>

              {/* 角色和团队 */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="font-medium">{game.role}</span>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{game.teamSize}</span>
                </div>
              </div>

              {/* 平台标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {game.platforms.map((platform, platformIndex) => (
                  <span
                    key={platformIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>

                          </div>
          </div>
        ))}
      </div>

      {/* 开发技能展示 */}
      <div className={`glass-effect rounded-2xl p-8 soft-shadow smooth-transition ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        animationDelay: mounted ? '1.2s' : '0s',
        animation: mounted ? 'slide-in-up 0.6s ease-out 1.2s both' : 'none'
      }}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold gradient-text mb-2">Development Expertise</h3>
          <p className="text-gray-600">Comprehensive game development skills from concept to deployment</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Programming Skills */}
          <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="relative mb-6">
              <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Programming</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-center">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">JavaScript</span>
                <span className="mx-2">•</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Python</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">C#</span>
                <span className="mx-2">•</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">TypeScript</span>
              </div>
            </div>
          </div>

          {/* Design Skills */}
          <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="relative mb-6">
              <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Design</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-center">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">UI/UX</span>
                <span className="mx-2">•</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">2D Art</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">AI Art</span>
                <span className="mx-2">•</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Animation</span>
              </div>
            </div>
          </div>

          {/* Game Engines */}
          <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="relative mb-6">
              <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Game Engines</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-center">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Unity</span>
                <span className="mx-2">•</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Renpy</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Fungus</span>
                <span className="mx-2">•</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Custom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};