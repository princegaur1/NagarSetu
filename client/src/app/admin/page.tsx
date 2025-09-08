'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

interface Issue {
  id: number;
  ticket_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  city: string;
  created_at: string;
  category_name: string;
  category_color: string;
  reporter_first_name: string;
  reporter_last_name: string;
  assigned_first_name: string | null;
  assigned_last_name: string | null;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    assignedTo: '',
    resolutionNotes: '',
    reason: '',
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      window.location.href = '/dashboard';
      return;
    }

    if (user && user.role === 'admin') {
      fetchIssues();
    }
  }, [user, authLoading]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getIssues({ limit: 50 });
      if (response.data?.issues) {
        setIssues(response.data.issues);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    try {
      await apiClient.updateIssueStatus(selectedIssue.id, {
        status: statusUpdate.status,
        assignedTo: statusUpdate.assignedTo ? parseInt(statusUpdate.assignedTo) : undefined,
        resolutionNotes: statusUpdate.resolutionNotes,
        reason: statusUpdate.reason,
      });

      // Refresh issues
      await fetchIssues();
      setSelectedIssue(null);
      setStatusUpdate({
        status: '',
        assignedTo: '',
        resolutionNotes: '',
        reason: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update issue status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🚫</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Access Denied</h3>
        <p className="text-gray-500">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage Nagar Setu and oversee platform operations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-blue-600">{issues.length}</div>
          <div className="text-gray-600">Total Issues</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {issues.filter(issue => issue.status === 'pending').length}
          </div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-blue-600">
            {issues.filter(issue => issue.status === 'in_progress').length}
          </div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-green-600">
            {issues.filter(issue => issue.status === 'resolved').length}
          </div>
          <div className="text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Issues</h2>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 m-6 rounded-md">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: issue.category_color }}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {issue.title}
                        </div>
                        <div className="text-sm text-gray-500">{issue.category_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {issue.ticket_id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        issue.status
                      )}`}
                    >
                      {issue.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        issue.priority
                      )}`}
                    >
                      {issue.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.reporter_first_name} {issue.reporter_last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(issue.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Update Issue Status
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Issue:</strong> {selectedIssue.title}
              </p>
              
              <form onSubmit={handleStatusUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusUpdate.status}
                    onChange={(e) => setStatusUpdate(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resolution Notes
                  </label>
                  <textarea
                    value={statusUpdate.resolutionNotes}
                    onChange={(e) => setStatusUpdate(prev => ({ ...prev, resolutionNotes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add resolution notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Change
                  </label>
                  <input
                    type="text"
                    value={statusUpdate.reason}
                    onChange={(e) => setStatusUpdate(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Reason for status change..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedIssue(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
