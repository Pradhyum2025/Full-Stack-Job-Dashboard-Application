// ---------------------------------------------------------------------
// <copyright file="JobForm.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addJob, updateJob } from '../store/slices/jobSlice';
import { createJob, updateJob as updateJobAPI } from '../operations/jobOperations';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { set } from 'zod';

function JobForm({ onJobPosted, editJob, onCancel }) {
  const methods = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editJob) {
      methods.reset({
        title: editJob.title,
        company: editJob.company,
        description: editJob.description,
        lastDate: editJob.lastDate?.split('T')[0] || editJob.lastDate
      });
    }
  }, [editJob, methods]);

  // On Submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (editJob) {
        const updatedJob = await updateJobAPI(editJob._id, data);
        dispatch(updateJob(updatedJob));
        toast.success('Job updated successfully!');
      } else {
        const newJob = await createJob(data);
        dispatch(addJob(newJob));
        toast.success('Job posted successfully!');
      }
      methods.reset();
      if (onJobPosted) {
        onJobPosted();
      }
    } catch (error) {
      console.log('Error saving job:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }finally{
      setLoading(false)
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label className htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="Senior Software Engineer"
            {...methods.register('title', { required: 'Job title is required' })}
          />
          {methods.formState.errors.title && (
            <p className="text-sm text-destructive">{methods.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            placeholder="Company name"
            {...methods.register('company', { required: 'Company name is required' })}
          />
          {methods.formState.errors.company && (
            <p className="text-sm text-destructive">{methods.formState.errors.company.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Describe the role, responsibilities, and requrements"
            {...methods.register('description', { required: 'Job description is required' })}
          />
          {methods.formState.errors.description && (
            <p className="text-sm text-destructive">{methods.formState.errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastDate">Last Date for Application</Label>
          <Input
            id="lastDate"
            type="date"
            {...methods.register('lastDate', { required: 'Last date is required' })}
          />
          {methods.formState.errors.lastDate && (
            <p className="text-sm text-destructive">{methods.formState.errors.lastDate.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          {editJob && onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1" size="lg">
              Cancel
            </Button>
          )}

         

          <button
            type="submit"
            disabled={loading}
            className={`
    w-full 
    bg-blue-600 
    text-white 
    py-2.5 
    text-sm
    font-semibold
    opacity
    transition-all 
    duration-300 
    
    ${!loading && "hover:scale-[1.01]"}
    ease-in-out 
    rounded-md
    flex 
    items-center 
    justify-center 
    gap-3
   disabled:cursor-not-allowed disabled:bg-blue-500 disabled:opacity-60' 
     
  `}
          >
            {loading ? (

              <div role="status" className='flex items-center gap-2'>
                <svg aria-hidden="true" class="w-6 h-6  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="tracking-wide">{editJob?"Updating...":"Posting.."}</span>
              </div>
            ) : (
              
            <span>{editJob ? 'Update Job' : 'Post Job'}</span>
            )}
          </button>

        </div>
      </form>
    </FormProvider>
  );
}

export default JobForm;
