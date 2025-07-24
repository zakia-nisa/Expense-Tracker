"use client"

import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ExpenseListTable from './_components/ExpenseListTable';

function AllExpensesPage() {
  const { user, isLoaded } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      getExpensesList();
    }
  }, [isLoaded]);

  const getExpensesList = async () => {
    setLoading(true);
    try {
      const result = await db.select().from(Expenses)
        .orderBy(desc(Expenses.id));
      
      setExpensesList(result);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>All Expenses</h2>

      <div className='mt-6'>
        <h2 className='font-bold text-lg'>List of All Expenses</h2>
        {loading ? (
          <p>Loading expenses...</p>
        ) : expensesList.length > 0 ? (
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getExpensesList} 
          />
        ) : (
          <p>No expenses found in the database.</p> 
        )}
      </div>
    </div>
  );
}

export default AllExpensesPage;
