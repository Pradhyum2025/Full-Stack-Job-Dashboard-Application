// ---------------------------------------------------------------------
// <copyright file="Profile.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

function Profile() {
  const user = useSelector((state) => state.auth.user);

  // Generate profile image URL using DiceBear API
  const fullName = user?.name || 'User';
  const profileImageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

  return (
    <div className="w-full">
        <div className="max-w-3xl mx-auto">

          {user ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center justify-center py-6 border-b">
                  <div className="relative">
                    <img
                      src={profileImageUrl}
                      alt={`${fullName} profile`}
                      className="w-32 h-32 rounded-full border-4 border-primary shadow-lg object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                </div>
                
                {/* Profile Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p className="text-lg font-semibold mt-1">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="text-lg font-semibold mt-1">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    Your profile information is secure and only visible to you.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          )}
        </div>
    </div>
  );
}

export default Profile;
