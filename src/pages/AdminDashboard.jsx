import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,678</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$123,456</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex space-x-4">
        <Button asChild>
          <Link to="/admin/users">Manage Users</Link>
        </Button>
        <Button asChild>
          <Link to="/admin/transactions">View Transactions</Link>
        </Button>
        <Button asChild>
          <Link to="/admin/bank-partners">Manage Bank Partners</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
