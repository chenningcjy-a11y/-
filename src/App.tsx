import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, LogOut, Award, BookOpen, GraduationCap, School, MapPin, Hash, CheckCircle2 } from 'lucide-react';

// Data for the simulation
const SCORE_DATA = [
  { subject: '语文', score: 91, countyRank: 5, schoolRank: 4 },
  { subject: '数学', score: 78, countyRank: 9, schoolRank: 3 },
  { subject: '英语', score: 27, countyRank: 2, schoolRank: 8 },
  { subject: '科学', score: 78, countyRank: 7, schoolRank: 4 },
  { subject: '历史', score: 13, countyRank: 7, schoolRank: 3 },
  { subject: '道法', score: 78, countyRank: 8, schoolRank: 8 },
];

const SUMMARY_DATA = {
  total: 365,
  countyRank: 8,
  schoolRank: 1,
  schoolName: '长街镇初级中学',
};

const BLANK_SCORE_DATA = [
  { subject: '语文', score: '', countyRank: '', schoolRank: '' },
  { subject: '数学', score: '', countyRank: '', schoolRank: '' },
  { subject: '英语', score: '', countyRank: '', schoolRank: '' },
  { subject: '科学', score: '', countyRank: '', schoolRank: '' },
  { subject: '历史', score: '', countyRank: '', schoolRank: '' },
  { subject: '道法', score: '', countyRank: '', schoolRank: '' },
];

const BLANK_SUMMARY_DATA = {
  total: '',
  countyRank: '',
  schoolRank: '',
  schoolName: '长街镇初级中学',
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scoreData, setScoreData] = useState<any[]>(SCORE_DATA);
  const [summaryData, setSummaryData] = useState<any>(SUMMARY_DATA);
  const [ticketNumber, setTicketNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber) {
      setError('请输入准考证号');
      return;
    }
    
    if (ticketNumber === 'admin') {
      setIsAdmin(true);
      setScoreData([...BLANK_SCORE_DATA.map(item => ({...item}))]);
      setSummaryData({...BLANK_SUMMARY_DATA});
    } else if (ticketNumber.length !== 14 || !ticketNumber.startsWith('2602262319')) {
      setError('输入错误请重新输入');
      return;
    } else {
      setIsAdmin(false);
      setScoreData([...SCORE_DATA.map(item => ({...item}))]);
      setSummaryData({...SUMMARY_DATA});
    }

    if (!isVerified && ticketNumber !== 'admin') {
      setError('请完成人机验证');
      return;
    }

    setError('');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTicketNumber('');
    setIsVerified(false);
    setSliderValue(0);
    setIsAdmin(false);
    setScoreData([...SCORE_DATA.map(item => ({...item}))]);
    setSummaryData({...SUMMARY_DATA});
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f0f4f8] font-sans text-gray-900 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-[#1e40af] text-white p-6 shadow-md relative z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full">
              <GraduationCap className="w-8 h-8 text-[#1e40af]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">2026年初中学业水平考试成绩查询系统</h1>
              <p className="text-xs text-blue-100 uppercase tracking-widest hidden sm:block">Academic Level Examination Result System</p>
            </div>
          </div>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors text-sm font-medium bg-blue-800/50 hover:bg-blue-800 px-3 py-1.5 rounded-full"
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white shadow-2xl rounded-sm border-t-8 border-[#1e40af] flex flex-col relative">
                <div className="bg-blue-50/50 px-6 py-8 border-b border-gray-100 text-center">
                  <div className="w-16 h-16 bg-[#1e40af] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800">考生登录</h2>
                  <p className="text-slate-500 mt-2 text-sm">请输入您的准考证号和密码进行查询</p>
                </div>
                
                <div className="p-6 md:p-8">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">准考证号</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Hash className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={ticketNumber}
                          onChange={(e) => setTicketNumber(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-slate-50 focus:bg-white"
                          placeholder="2602262319xxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">人机验证</label>
                      <div className="relative h-12 bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                        {/* Background fill */}
                        <div 
                          className="absolute top-0 left-0 bottom-0 bg-green-100 transition-all duration-100 pointer-events-none"
                          style={{ width: isVerified ? '100%' : `${sliderValue}%` }}
                        />
                        
                        {/* Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className={`text-sm font-medium ${isVerified ? 'text-green-700' : 'text-slate-500'}`}>
                            {isVerified ? '验证通过' : '请向右滑动滑块'}
                          </span>
                        </div>

                        {/* Slider input */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isVerified ? 100 : sliderValue}
                          onChange={(e) => {
                            if (isVerified) return;
                            setSliderValue(parseInt(e.target.value));
                          }}
                          onMouseUp={() => {
                            if (isVerified) return;
                            if (sliderValue >= 95) {
                              setIsVerified(true);
                              setSliderValue(100);
                              setError('');
                            } else {
                              setSliderValue(0);
                            }
                          }}
                          onTouchEnd={() => {
                            if (isVerified) return;
                            if (sliderValue >= 95) {
                              setIsVerified(true);
                              setSliderValue(100);
                              setError('');
                            } else {
                              setSliderValue(0);
                            }
                          }}
                          disabled={isVerified}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                        />

                        {/* Visual Thumb */}
                        <div 
                          className="absolute top-1 bottom-1 w-10 bg-white rounded shadow-sm flex items-center justify-center border border-slate-200 transition-all duration-100 pointer-events-none z-0"
                          style={{ left: isVerified ? 'calc(100% - 2.75rem)' : `calc(${sliderValue}% - ${sliderValue * 0.0275}rem + 0.25rem)` }}
                        >
                          {isVerified ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="flex -space-x-1">
                              <span className="text-slate-400">›</span>
                              <span className="text-slate-400">›</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm flex items-center gap-1.5 bg-red-50 p-2 rounded-md">
                        <CheckCircle2 className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#1e40af] text-white font-bold py-3 rounded-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:ring-offset-2 transition-all shadow-lg shadow-blue-200 uppercase tracking-wider"
                    >
                      查询成绩
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl bg-white shadow-2xl rounded-sm border-t-8 border-blue-700 p-6 sm:p-10 flex flex-col relative"
            >
              <div className="absolute top-10 right-10 opacity-10 hidden sm:block pointer-events-none">
                <div className="w-40 h-40 border-8 border-red-600 rounded-full flex items-center justify-center border-double rotate-12">
                  <p className="text-red-600 font-bold text-2xl border-2 border-red-600 p-2">考试中心</p>
                </div>
              </div>

              {/* Student Info Card */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 relative z-10 gap-4">
                <div className="space-y-1">
                  <h2 className="text-3xl font-serif font-bold text-gray-800 flex items-center gap-2">
                    成绩通知单 <span className="text-lg font-normal text-gray-500 italic">(2026年度)</span>
                  </h2>
                  <div className="mt-4 space-y-1">
                    <p className="text-gray-600">
                      学校名称：
                      {isAdmin ? (
                        <input
                          type="text"
                          value={summaryData.schoolName}
                          onChange={(e) => setSummaryData({ ...summaryData, schoolName: e.target.value })}
                          className="font-semibold text-gray-900 bg-transparent border-b border-gray-400 outline-none w-48"
                        />
                      ) : (
                        <span className="font-semibold text-gray-900 underline underline-offset-4">{summaryData.schoolName}</span>
                      )}
                    </p>
                    <p className="text-gray-600">
                      考生准考证号：
                      {isAdmin ? (
                        <input
                          type="text"
                          value={ticketNumber}
                          onChange={(e) => setTicketNumber(e.target.value)}
                          className="font-mono font-bold text-blue-800 bg-transparent border-b border-gray-400 outline-none w-48"
                        />
                      ) : (
                        <span className="font-mono font-bold text-blue-800">{ticketNumber || '未提供'}</span>
                      )}
                    </p>
                  </div>
                </div>

              {/* Summary Highlights (placed alongside Student Info) */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded text-center min-w-[200px] shrink-0">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">考试总分 Total Score</p>
                {isAdmin ? (
                  <input
                    type="text"
                    value={summaryData.total}
                    onChange={(e) => setSummaryData({ ...summaryData, total: e.target.value })}
                    className="w-full text-center bg-transparent border-b border-blue-300 text-5xl font-black text-blue-900 outline-none placeholder-blue-300"
                    placeholder="---"
                  />
                ) : (
                  <p className="text-5xl font-black text-blue-900">{summaryData.total}</p>
                )}
                <div className="flex justify-around mt-2 pt-2 border-t border-blue-200">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">县总排名</p>
                    {isAdmin ? (
                      <input
                        type="text"
                        value={summaryData.countyRank}
                        onChange={(e) => setSummaryData({ ...summaryData, countyRank: e.target.value })}
                        className="w-full text-center bg-transparent border-b border-blue-300 font-bold text-blue-800 text-lg outline-none placeholder-blue-300"
                        placeholder="-"
                      />
                    ) : (
                      <p className="font-bold text-blue-800 text-lg">{summaryData.countyRank}</p>
                    )}
                  </div>
                  <div className="border-l border-blue-200"></div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">校总排名</p>
                    {isAdmin ? (
                      <input
                        type="text"
                        value={summaryData.schoolRank}
                        onChange={(e) => setSummaryData({ ...summaryData, schoolRank: e.target.value })}
                        className="w-full text-center bg-transparent border-b border-green-300 font-bold text-green-700 text-lg outline-none placeholder-green-300"
                        placeholder="-"
                      />
                    ) : (
                      <p className="font-bold text-green-700 text-lg">{summaryData.schoolRank}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

              {/* Detailed Scores */}
              <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">考试科目</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">单科分数</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">县排名</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">校排名</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">评级</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {scoreData.map((item, index) => {
                        const scoreVal = Number(item.score);
                        const isExcellent = item.score !== '' && !isNaN(scoreVal) && scoreVal >= 85;
                        const isGood = item.score !== '' && !isNaN(scoreVal) && scoreVal >= 70 && scoreVal < 85;
                        const isFair = item.score !== '' && !isNaN(scoreVal) && scoreVal >= 60 && scoreVal < 70;
                        let ratingLabel = 'POOR';
                        let ratingClass = 'bg-red-100 text-red-700';
                        if (item.score === '') {
                          ratingLabel = '-';
                          ratingClass = 'bg-gray-100 text-gray-500';
                        } else if (isExcellent) {
                          ratingLabel = 'EXCELLENT';
                          ratingClass = 'bg-green-100 text-green-700';
                        } else if (isGood) {
                          ratingLabel = 'GOOD';
                          ratingClass = 'bg-blue-100 text-blue-700';
                        } else if (isFair) {
                          ratingLabel = 'FAIR';
                          ratingClass = 'bg-gray-100 text-gray-600';
                        }

                        return (
                          <tr key={item.subject} className="hover:bg-blue-50/30">
                            <td className="px-6 py-4 font-semibold text-gray-900">
                              {item.subject}
                            </td>
                            <td className="px-6 py-4 text-center font-mono text-lg">
                              {isAdmin ? (
                                <input
                                  type="text"
                                  value={item.score}
                                  onChange={(e) => {
                                    const newData = [...scoreData];
                                    newData[index].score = e.target.value;
                                    setScoreData(newData);
                                  }}
                                  className="w-16 text-center bg-transparent border-b border-gray-300 outline-none"
                                />
                              ) : (
                                item.score
                              )}
                            </td>
                            <td className="px-6 py-4 text-center text-blue-700 font-bold">
                              {isAdmin ? (
                                <input
                                  type="text"
                                  value={item.countyRank}
                                  onChange={(e) => {
                                    const newData = [...scoreData];
                                    newData[index].countyRank = e.target.value;
                                    setScoreData(newData);
                                  }}
                                  className="w-16 text-center bg-transparent border-b border-blue-300 outline-none"
                                />
                              ) : (
                                item.countyRank
                              )}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-600">
                              {isAdmin ? (
                                <input
                                  type="text"
                                  value={item.schoolRank}
                                  onChange={(e) => {
                                    const newData = [...scoreData];
                                    newData[index].schoolRank = e.target.value;
                                    setScoreData(newData);
                                  }}
                                  className="w-16 text-center bg-transparent border-b border-gray-300 outline-none"
                                />
                              ) : (
                                item.schoolRank
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-[10px] font-bold rounded ${ratingClass}`}>
                                {ratingLabel}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <footer className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-end text-gray-400 text-[10px] gap-4">
                <div className="space-y-1 uppercase tracking-tighter">
                  <p>数据生成时间: {new Date().toLocaleString('zh-CN', { hour12: false })}</p>
                  <p>查询终端: WEB_PRO_CLIENT_V4</p>
                  <p>校验码: AF88-922B-7721-CC12</p>
                </div>
                <div className="flex space-x-4 sm:space-x-6 w-full sm:w-auto">
                  {isAdmin ? (
                    <button 
                      onClick={() => setIsAdmin(false)}
                      className="flex-1 sm:flex-none px-6 py-2 bg-green-600 text-white font-bold rounded uppercase shadow-lg shadow-green-200 hover:bg-green-700 transition-colors"
                    >
                      生成成绩单 (Generate)
                    </button>
                  ) : (
                    <>
                      <button className="flex-1 sm:flex-none px-4 py-2 border border-blue-600 text-blue-600 font-bold rounded uppercase hover:bg-blue-50 transition-colors">打印成绩单 (Print)</button>
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white font-bold rounded uppercase shadow-lg shadow-blue-200">保存证明 (Save PDF)</button>
                    </>
                  )}
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-xs mt-auto relative z-10">
        &copy; 2026 宁海县教育局教育考试院 版权所有 <br className="sm:hidden" /> (成绩查询模拟系统)
      </footer>
    </div>
  );
}
