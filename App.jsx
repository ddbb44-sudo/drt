import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, PieChart as PieChartIcon, 
  Briefcase, AlertCircle, Percent
} from 'lucide-react';

// --- Data Preparation ---

const kpiData = [
  { id: 1, title: "صافي المبيعات", val2025: "66.4M", val2024: "39.6M", change: "+67.6%", trend: "up", icon: DollarSign, color: "bg-blue-50 text-blue-600" },
  { id: 2, title: "إجمالي الربح", val2025: "54.4M", val2024: "32.2M", change: "+69.1%", trend: "up", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
  { id: 3, title: "الربح التشغيلي", val2025: "22.5M", val2024: "10.4M", change: "+115.5%", trend: "up", icon: Activity, color: "bg-indigo-50 text-indigo-600" },
  { id: 4, title: "صافي الدخل", val2025: "21.4M", val2024: "10.6M", change: "+101.8%", trend: "up", icon: Briefcase, color: "bg-purple-50 text-purple-600" },
];

const yearlyComparisonData = [
  { name: 'المبيعات', '2024': 39.6, '2025': 66.4 },
  { name: 'إجمالي الربح', '2024': 32.2, '2025': 54.4 },
  { name: 'المصروفات', '2024': 21.7, '2025': 31.9 },
  { name: 'الربح التشغيلي', '2024': 10.4, '2025': 22.5 },
  { name: 'صافي الدخل', '2024': 10.6, '2025': 21.4 },
];

const expensesData2025 = [
  { name: 'الرواتب', value: 13.9, percentage: '43.6%' },
  { name: 'الإيجار', value: 5.0, percentage: '15.7%' },
  { name: 'مصروفات ما قبل التشغيل', value: 2.7, percentage: '8.5%' },
  { name: 'العمولات', value: 2.5, percentage: '7.8%' },
  { name: 'الإهلاك', value: 2.2, percentage: '6.9%' },
  { name: 'التسويق', value: 1.5, percentage: '4.7%' },
  { name: 'أخرى', value: 4.1, percentage: '12.8%' }
];

const commonSizeData = [
  { name: 'تكلفة البضاعة', value: 18.1, color: 'bg-red-400' },
  { name: 'المصروفات التشغيلية', value: 49.7, color: 'bg-orange-400' },
  { name: 'صافي الربح', value: 32.2, color: 'bg-emerald-500' }
];

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

// --- Components ---

const MetricCard = ({ title, val2025, val2024, change, trend, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'} bg-slate-50 px-2 py-1 rounded-lg`}>
        {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span dir="ltr">{change}</span>
      </div>
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-slate-800">{val2025}</span>
        <span className="text-sm font-medium text-slate-400 font-mono">SAR</span>
      </div>
      <div className="mt-2 text-xs text-slate-400 flex justify-between items-center border-t border-slate-100 pt-2">
        <span>العام السابق:</span>
        <span className="font-semibold text-slate-500">{val2024}</span>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">التقرير المالي السنوي</h1>
          <p className="text-slate-500 font-medium mt-1">شركة سفن لخدمات السيارات (Seven Auto Services)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            أداء 2025 مقارنة بـ 2024
          </div>
        </div>
      </header>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi) => (
          <MetricCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Bar Chart: Year over Year */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} />
              مقارنة المؤشرات الرئيسية (بالملايين)
            </h2>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value}M`} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value} مليون ريال`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="2024" name="عام 2024" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="2025" name="عام 2025" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Expenses Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <PieChartIcon className="text-purple-500" size={20} />
              توزيع المصروفات (2025)
            </h2>
          </div>
          <div className="flex-1 h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData2025}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {expensesData2025.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => [`${value} مليون ريال`, 'التكلفة']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
            {expensesData2025.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[index] }}></span>
                <span className="text-slate-600 truncate" title={item.name}>{item.name}</span>
                <span className="mr-auto font-bold text-slate-800">{item.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Size Analysis Info-graphic */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Percent className="text-amber-500" size={24} />
              التحليل الهيكلي للإيرادات (Common Size)
            </h2>
            <p className="text-slate-500 mt-1">أين يذهب كل 100 ريال من إيرادات الشركة لعام 2025؟</p>
          </div>
        </div>

        <div className="relative pt-8 pb-4">
          {/* Main Bar */}
          <div className="h-16 w-full flex rounded-2xl overflow-hidden shadow-inner">
            <div className="bg-slate-200 h-full flex items-center justify-center text-slate-600 font-bold text-sm md:text-lg border-l border-white/20" style={{ width: '18.1%' }}>
              تكلفة مبيعات (18.1%)
            </div>
            <div className="bg-blue-100 h-full flex items-center justify-center text-blue-700 font-bold text-sm md:text-lg border-l border-white/20 relative" style={{ width: '49.7%' }}>
              مصروفات (49.7%)
            </div>
            <div className="bg-emerald-500 h-full flex items-center justify-center text-white font-bold text-sm md:text-lg" style={{ width: '32.2%' }}>
              صافي الربح (32.2%)
            </div>
          </div>
          
          {/* Legend/Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 border-t-4 border-t-slate-300">
              <h4 className="font-bold text-slate-700 mb-2">الكفاءة التشغيلية</h4>
              <p className="text-sm text-slate-600">تكلفة البضاعة المباعة تمثل 18.1% فقط من الإيرادات، مما يعكس هامش ربح إجمالي قوي جداً (81.9%).</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 border-t-4 border-t-blue-400">
              <h4 className="font-bold text-blue-800 mb-2">المصروفات والرواتب</h4>
              <p className="text-sm text-blue-600">تستهلك المصروفات نصف الإيرادات تقريباً، والرواتب وحدها تستحوذ على 20.9% من إجمالي الإيرادات.</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 border-t-4 border-t-emerald-500">
              <h4 className="font-bold text-emerald-800 mb-2">الربحية النهائية</h4>
              <p className="text-sm text-emerald-600">يتبقى 32.2 ريال كصافي ربح من كل 100 ريال مبيعات، وهو تحسن ممتاز مقارنة بـ 26.7% في عام 2024.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
