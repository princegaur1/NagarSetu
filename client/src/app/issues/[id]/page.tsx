'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import CategoryIcon from '@/components/CategoryIcon';

interface Issue {
  id: number;
  ticket_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  location_address: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  street_name: string;
  nearby_landmark: string;
  pincode: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  resolution_notes: string | null;
  category_name: string;
  category_color: string;
  category_icon: string;
  reporter_first_name: string;
  reporter_last_name: string;
  reporter_email: string;
  assigned_first_name: string | null;
  assigned_last_name: string | null;
  images: Array<{
    id: number;
    image_url: string;
    caption: string;
  }>;
  comments: Array<{
    id: number;
    comment: string;
    is_internal: boolean;
    created_at: string;
    first_name: string;
    last_name: string;
    role: string;
  }>;
}

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchIssue();
    }
  }, [params.id]);

  const fetchIssue = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getIssue(Number(params.id));
      if (response.data) {
        setIssue(response.data as Issue);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch issue');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !issue) return;

    try {
      setSubmittingComment(true);
      await apiClient.addComment(issue.id, {
        comment: newComment,
        isInternal: false,
      });
      
      setNewComment('');
      // Refresh issue to get updated comments
      await fetchIssue();
    } catch (err: any) {
      console.error('Error adding comment:', err);
    } finally {
      setSubmittingComment(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Issue Not Found</h3>
        <p className="text-gray-500 mb-6">
          The issue you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.push('/issues')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Back to Issues
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{issue.title}</h1>
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-mono">
                {issue.ticket_id}
              </span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  issue.status
                )}`}
              >
                {issue.status.replace('_', ' ').toUpperCase()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                  issue.priority
                )}`}
              >
                {issue.priority.toUpperCase()}
              </span>
              <div className="flex items-center">
                <CategoryIcon 
                  icon={issue.category_icon} 
                  color={issue.category_color} 
                  size="md"
                  className="mr-2"
                />
                <span className="text-gray-600">{issue.category_name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <strong>Street Name:</strong> {issue.street_name || 'Not specified'}
          </div>
          <div>
            <strong>Nearby Landmark:</strong> {issue.nearby_landmark || 'Not specified'}
          </div>
          <div>
            <strong>City:</strong> {issue.city}, {issue.state} - {issue.pincode}
          </div>
          <div>
            <strong>Cordiantes:</strong> {issue.latitude || 0}, {issue.longitude || 0} 
          </div>
          <div>
            <strong>Reported by:</strong> {issue.reporter_first_name} {issue.reporter_last_name}
          </div>
          <div>
            <strong>Reported on:</strong> {new Date(issue.created_at).toLocaleDateString()}
          </div>
          {issue.assigned_first_name && (
            <div>
              <strong>Assigned to:</strong> {issue.assigned_first_name} {issue.assigned_last_name}
            </div>
          )}
          {issue.resolved_at && (
            <div>
              <strong>Resolved on:</strong> {new Date(issue.resolved_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Images */}
      {issue.images.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issue.images.map((image) => (
              <div key={image.id} className="aspect-w-16 aspect-h-9">
                <img
                  src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api').replace('/api','')}${image.image_url}`}
                  alt={image.caption || issue.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{issue.description}</p>
      </div>

      {/* Resolution Notes */}
      {issue.resolution_notes && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resolution Notes</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{issue.resolution_notes}</p>
        </div>
      )}

      {/* Comments */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Comments ({issue.comments.length})
        </h2>

        {/* Add Comment Form */}
        {user && (
          <form onSubmit={handleAddComment} className="mb-6">
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submittingComment || !newComment.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submittingComment ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        )}

        {/* Comments List */}
        {issue.comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {issue.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-700">
                        {comment.first_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {comment.first_name} {comment.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {comment.role === 'admin' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap ml-11">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Print
          </button>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              // You could add a toast notification here
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
