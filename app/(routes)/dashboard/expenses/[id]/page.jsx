"use client"
import React, { use, useEffect } from 'react'

function Expenses({params}) {
    useEffect(() => {

        console.log(params)

    }, [params]);

    
    const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)

    }
    
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>My Expenses</h2>
    </div>
  )
}

export default Expenses

