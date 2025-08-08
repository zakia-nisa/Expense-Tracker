"use client"

import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema'; // Import Budgets schema
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm'; // Import eq for equality comparisons
import React, { useEffect, useState } from 'react';
import ExpenseListTable from './_components/ExpenseListTable';

function AllExpensesPage() {
  const { user, isLoaded } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getExpensesList();
    } else if (isLoaded && !user?.primaryEmailAddress?.emailAddress) {
      setLoading(false);
    }
  }, [isLoaded, user]);

  const getExpensesList = async () => {
    setLoading(true);
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      // Join Expenses with Budgets to filter by the user who created the budget
      const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        budgetId: Expenses.budgetId, // Include budgetId if needed by ExpenseListTable
      })
      .from(Expenses)
      .innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
      .where(eq(Budgets.createdBy, userEmail))
      .orderBy(desc(Expenses.id));
      
      setExpensesList(result);
    } catch (error) {
      console.error("Failed to fetch user expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>

      <div className='mt-6'>
        <h2 className='font-bold text-lg'>List of My Latest Expenses</h2>
        {loading ? (
          <p>Loading expenses...</p>
        ) : expensesList.length > 0 ? (
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getExpensesList} 
          />
        ) : (
          <p>No expenses found for your account.</p> 
        )}
      </div>
    </div>
  );
}

export default AllExpensesPage;
