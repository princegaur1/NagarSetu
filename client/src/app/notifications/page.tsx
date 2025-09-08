'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  issue_title: string;
  issue_id: number;
}

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
      return;
    }

    if (user) {
      fetchNotifications();
    }
  }, [user, authLoading]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getNotifications({ limit: 50 });
      if (response.data?.notifications) {
        setNotifications(response.data.notifications);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      await apiClient.markNotificationRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.markAllNotificationsRead();
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, is_read: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const deleteNotification = async (notificationId: number) => {
    try {
      await apiClient.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'issue_update':
        return '📝';
      case 'status_change':
        return '🔄';
      case 'comment':
        return '💬';
      case 'assignment':
        return '👤';
      default:
        return '🔔';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'issue_update':
        return 'bg-blue-100 text-blue-800';
      case 'status_change':
        return 'bg-green-100 text-green-800';
      case 'comment':
        return 'bg-purple-100 text-purple-800';
      case 'assignment':
        return 'bg-orange-100 text-orange-800';
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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">
            Stay updated on your Nagar Setu and platform activity
          </p>
        </div>
        {notifications.some(n => !n.is_read) && (
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Notifications</h3>
          <p className="text-gray-500">
            You don't have any notifications yet. When you report issues or receive updates, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md p-6 transition-colors ${
                notification.is_read ? 'opacity-75' : 'border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl">
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {notification.type.replace('_', ' ').toUpperCase()}
                      </span>
                      {!notification.is_read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-2">
                      {notification.message}
                    </p>
                    
                    {notification.issue_title && (
                      <p className="text-sm text-blue-600 font-medium">
                        Related to: {notification.issue_title}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.is_read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Mark as Read
                    </button>
                  )}
                  
                  {notification.issue_id && (
                    <a
                      href={`/issues/${notification.issue_id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Issue
                    </a>
                  )}
                  
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
