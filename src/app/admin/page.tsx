'use client'
import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Users, DollarSign, TrendingUp, Activity, Loader2, Search, MoreHorizontal, Calendar } from 'lucide-react'

interface User {
  id: string
  email: string
  full_name: string
  company_name: string
  subscription_status: string
  created_at: string
  updated_at: string
}

interface Stats {
  totalUsers: number
  totalRevenue: number
  activeSubscriptions: number
  monthlyGrowth: number
}

interface ActivityItem {
  id: string
  type: 'user_signup' | 'invoice_created' | 'payment_received'
  user_email: string
  description: string
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!), [])
  
  const [authLoading, setAuthLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    monthlyGrowth: 0
  })
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')

  // Auth guard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setAuthLoading(false)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/login')
      }
    }
    
    checkAuth()
  }, [supabase.auth, router])

  // Load admin data
  useEffect(() => {
    const loadAdminData = async () => {
      if (authLoading) return
      
      setLoading(true)
      setError('')
      
      try {
        // Load users
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (usersError) throw usersError
        setUsers(usersData || [])
        
        // Calculate stats
        const totalUsers = usersData?.length || 0
        const activeSubscriptions = usersData?.filter(u => u.subscription_status === 'active').length || 0
        
        // Get total revenue from payments
        const { data: paymentsData, error: paymentsError } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'completed')
        
        const totalRevenue = paymentsData?.reduce((sum, payment) => sum + payment.amount, 0) || 0
        
        // Calculate monthly growth
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
        
        const currentMonthUsers = usersData?.filter(u => {
          const userDate = new Date(u.created_at)
          return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear
        }).length || 0
        
        const lastMonthUsers = usersData?.filter(u => {
          const userDate = new Date(u.created_at)
          return userDate.getMonth() === lastMonth && userDate.getFullYear() === lastMonthYear
        }).length || 0
        
        const monthlyGrowth = lastMonthUsers > 0 ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100 : 0
        
        setStats({
          totalUsers,
          totalRevenue,
          activeSubscriptions,
          monthlyGrowth
        })
        
        // Generate recent activity (simulated)
        const activities: ActivityItem[] = []
        usersData?.slice(0, 5).forEach(user => {
          activities.push({
            id: `signup_${user.id}`,
            type: 'user_signup',
            user_email: user.email,
            description: `${user.full_name || user.email} signed up`,
            created_at: user.created_at
          })
        })
        
        setRecentActivity(activities)
        
      } catch (error) {
        console.error('Error loading admin data:', error)
        setError('Failed to load admin data')
      } finally {
        setLoading(false)
      }
    }
    
    loadAdminData()
  }, [supabase, authLoading])

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <Users className="h-4 w-4 text-green-400" />
      case 'invoice_created':
        return <Calendar className="h-4 w-4 text-blue-400" />
      case 'payment_received':
        return <DollarSign className="h-4 w-4 text-emerald-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-400">Manage users and monitor system activity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-white">{stats.activeSubscriptions}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Monthly Growth</p>
                    <p className="text-2xl font-bold text-white">
                      {stats.monthlyGrowth > 0 ? '+' : ''}{stats.monthlyGrowth.toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className={`h-8 w-8 ${stats.monthlyGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Users Table */}
              <div className="lg:col-span-2">
                <div className="bg-slate-800 rounded-xl border border-slate-700">
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Users</h2>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-400 mb-2">No users found</h3>
                        <p className="text-slate-500">No users match your search criteria.</p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left py-4 px-6 text-slate-400 font-medium">User</th>
                            <th className="text-left py-4 px-6 text-slate-400 font-medium">Company</th>
                            <th className="text-left py-4 px-6 text-slate-400 font-medium">Status</th>
                            <th className="text-left py-4 px-6 text-slate-400 font-medium">Joined</th>
                            <th className="text-right py-4 px-6 text-slate-400 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                              <td className="py-4 px-6">
                                <div>
                                  <div className="font-medium text-white">{user.full_name || 'N/A'}</div>
                                  <div className="text-sm text-slate-400">{user.email}</div>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-slate-300">{user.company_name || 'N/A'}</td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  user.subscription_status === 'active' 
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    : user.subscription_status === 'canceled'
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                  {user.subscription_status || 'trial'}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-slate-300">{formatDate(user.created_at)}</td>
                              <td className="py-4 px-6 text-right">
                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800 rounded-xl border border-slate-700">
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                  </div>
                  
                  <div className="p-6">
                    {recentActivity.length === 0 ? (
                      <div className="text-center py-8">
                        <Activity className="h-8 w-8 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500">No recent activity</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white">{activity.description}</p>
                              <p className="text-xs text-slate-400 mt-1">
                                {formatDate(activity.created_at)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}