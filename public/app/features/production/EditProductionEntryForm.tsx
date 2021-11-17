import React, { FC, useEffect, useState } from 'react';
import { Button, Field, FieldSet, Form, Input, PageToolbar } from '@grafana/ui';
import { ProductionVolumeDTO } from 'app/types';
// import { format } from 'date-fns';
// const DATE_FORMAT = 'yyyy-MM-dd';

export interface Props {
  existingBaseline: ProductionVolumeDTO;
  isSavingBaselineEntry: boolean;
  updateBaselineEntry: (payload: ProductionVolumeDTO) => void;
}

export const EditBaselineEntryForm: FC<Props> = ({ existingBaseline, isSavingBaselineEntry, updateBaselineEntry }) => {
  const [id, setId] = useState({ value: '' });
  const [day, setDay] = useState({ value: '' });
  const [wareHouseStaff, setWareHouseStaff] = useState({ value: '' });
  const [storeEmployees, setStoreEmployees] = useState({ value: '' });
  const [staffTotal, setStaffTotal] = useState({ value: '' });
  const [noOfStaffOfficeSales, setNoOfStaffOfficeSales] = useState({ value: '' });
  const [noOfStaffOfficeAccounts, setNoOfStaffOfficeAccounts] = useState({ value: '' });
  const [noOfStaffOfficeGroupPurchasing, setNoOfStaffOfficeGroupPurchasing] = useState({ value: '' });
  const [noOfStaffOfficeStorePurchasing, setNoOfStaffOfficeStorePurchasing] = useState({ value: '' });
  const [noOfStaffStoreCustomerService, setNoOfStaffStoreCustomerService] = useState({ value: '' });
  const [noOfStaffStoreCashiers, setNoOfStaffStoreCashiers] = useState({ value: '' });
  const [noOfStaffStorePharmacy, setNoOfStaffStorePharmacy] = useState({ value: '' });
  const [noOfStaffStoreSalesFloor, setNoOfStaffStoreSalesFloor] = useState({ value: '' });
  const [noOfStaffStoreReceival, setNoOfStaffStoreReceival] = useState({ value: '' });
  const [wareHouseHiProStore, setWareHouseHiProStore] = useState({ value: '' });
  const [noOfCustomersTotal, setNoOfCustomersTotal] = useState({ value: '' });
  const [noOfCustomersStore, setNoOfCustomersStore] = useState({ value: '' });
  const [noOfTransactionsTotal, setNoOftransactionstotal] = useState({ value: '' });
  const [noOfTransactionsItemDepartmentA, setNoOfTransactionsItemDepartmentAe] = useState({ value: '' });
  const [noOfTransactionsItemDepartmentB, setNoOfTransactionsItemDepartmentB] = useState({ value: '' });
  const [noOfTransactionsItemDepartmentC, setNoOfTransactionsItemDepartmentC] = useState({ value: '' });
  const [noOfTransactionsItemDepartmentD, setNoOfTransactionsItemDepartmentD] = useState({ value: '' });
  const [noOfTransactionsItemDepartmentE, setNoOfTransactionsItemDepartmentE] = useState({ value: '' });
  const [truckDeliveriesTotal, setTruckDeliveriesTotal] = useState({ value: '' });
  const [truckDeliveriesTypeA, setTruckDeliveriesTypeA] = useState({ value: '' });
  const [truckDeliveriesTypeB, setTruckDeliveriesTypeB] = useState({ value: '' });
  const [truckDeliveriesTypeC, setTruckDeliveriesTypeC] = useState({ value: '' });
  const [truckDeliveriesTypeD, setTruckDeliveriesTypeD] = useState({ value: '' });

  const onSubmitBaselineEntry = (data: ProductionVolumeDTO) => {
    updateBaselineEntry(data);
    clearForm();
  };
  const clearForm = () => {
    (document.getElementById('edit-baseline-entry-form') as HTMLInputElement & {
      reset: () => boolean;
    }).reset();
  };

  const onSubmit = (data: any) => {
    // TODO: get the form data to be updated with the correct values instead of
    // needing to create this data object form state
    const trueData = {
      id: id.value,
      day: day.value,
      wareHouseStaff: wareHouseStaff.value,
      storeEmployees: storeEmployees.value,
      staffTotal: staffTotal.value,
      noOfStaffOfficeSales: noOfStaffOfficeSales.value,
      noOfStaffOfficeAccounts: noOfStaffOfficeAccounts.value,
      noOfStaffOfficeGroupPurchasing: noOfStaffOfficeGroupPurchasing.value,
      noOfStaffOfficeStorePurchasing: noOfStaffOfficeStorePurchasing.value,
      noOfStaffStoreCustomerService: noOfStaffStoreCustomerService.value,
      noOfStaffStoreCashiers: noOfStaffStoreCashiers.value,
      noOfStaffStorePharmacy: noOfStaffStorePharmacy.value,
      noOfStaffStoreSalesFloor: noOfStaffStoreSalesFloor.value,
      noOfStaffStoreReceival: noOfStaffStoreReceival.value,
      wareHouseHiProStore: wareHouseHiProStore.value,
      noOfCustomersTotal: noOfCustomersTotal.value,
      noOfCustomersStore: noOfCustomersStore.value,
      noOfTransactionsTotal: noOfTransactionsTotal.value,
      noOfTransactionsItemDepartmentA: noOfTransactionsItemDepartmentA.value,
      noOfTransactionsItemDepartmentB: noOfTransactionsItemDepartmentB.value,
      noOfTransactionsItemDepartmentC: noOfTransactionsItemDepartmentC.value,
      noOfTransactionsItemDepartmentD: noOfTransactionsItemDepartmentD.value,
      noOfTransactionsItemDepartmentE: noOfTransactionsItemDepartmentE.value,
      truckDeliveriesTotal: truckDeliveriesTotal.value,
      truckDeliveriesTypeA: truckDeliveriesTypeA.value,
      truckDeliveriesTypeB: truckDeliveriesTypeB.value,
      truckDeliveriesTypeC: truckDeliveriesTypeC.value,
      truckDeliveriesTypeD: truckDeliveriesTypeD.value,
    };
    onSubmitBaselineEntry(trueData);
  };

  useEffect(() => {
    setId({ value: existingBaseline.id as string });
    setDay({ value: existingBaseline.day });
    setWareHouseStaff({ value: existingBaseline.wareHouseStaff });
    setStoreEmployees({ value: existingBaseline.storeEmployees });
    setStaffTotal({ value: existingBaseline.staffTotal as string });
    setNoOfStaffOfficeSales({ value: existingBaseline.noOfStaffOfficeSales as string });
    setNoOfStaffOfficeAccounts({ value: existingBaseline.noOfStaffOfficeAccounts as string });
    setNoOfStaffOfficeGroupPurchasing({ value: existingBaseline.noOfStaffOfficeGroupPurchasing as string });
    setNoOfStaffOfficeStorePurchasing({ value: existingBaseline.noOfStaffOfficeStorePurchasing as string });
    setNoOfStaffStoreCustomerService({ value: existingBaseline.noOfStaffStoreCustomerService as string });
    setNoOfStaffStoreCashiers({ value: existingBaseline.noOfStaffStoreCashiers as string });
    setNoOfStaffStorePharmacy({ value: existingBaseline.noOfStaffStorePharmacy as string });
    setNoOfStaffStoreSalesFloor({ value: existingBaseline.noOfStaffStoreSalesFloor as string });
    setNoOfStaffStoreReceival({ value: existingBaseline.noOfStaffStoreReceival as string });
    setWareHouseHiProStore({ value: existingBaseline.wareHouseHiProStore as string });
    setNoOfCustomersTotal({ value: existingBaseline.noOfCustomersTotal as string });
    setNoOfCustomersStore({ value: existingBaseline.noOfCustomersStore as string });
    setNoOftransactionstotal({ value: existingBaseline.noOfTransactionsTotal as string });
    setNoOfTransactionsItemDepartmentAe({ value: existingBaseline.noOfTransactionsItemDepartmentA as string });
    setNoOfTransactionsItemDepartmentB({ value: existingBaseline.noOfTransactionsItemDepartmentB as string });
    setNoOfTransactionsItemDepartmentC({ value: existingBaseline.noOfTransactionsItemDepartmentC as string });
    setNoOfTransactionsItemDepartmentD({ value: existingBaseline.noOfTransactionsItemDepartmentD as string });
    setNoOfTransactionsItemDepartmentE({ value: existingBaseline.noOfTransactionsItemDepartmentE as string });
    setTruckDeliveriesTotal({ value: existingBaseline.truckDeliveriesTotal as string });
    setTruckDeliveriesTypeA({ value: existingBaseline.truckDeliveriesTypeA as string });
    setTruckDeliveriesTypeB({ value: existingBaseline.truckDeliveriesTypeB as string });
    setTruckDeliveriesTypeB({ value: existingBaseline.truckDeliveriesTypeC as string });
    setTruckDeliveriesTypeC({ value: existingBaseline.truckDeliveriesTypeD as string });
  }, [existingBaseline]);

  return (
    <Form id="edit-baseline-entry-form" className="edit-baseline-entry-form" onSubmit={onSubmit} validateOn="onBlur">
      {({ register, errors, clearErrors, setValue }) => {
        setValue('id', id.value);
        setValue('day', existingBaseline.day);
        setValue('wareHouseStaff', existingBaseline.wareHouseStaff);
        setValue('storeEmployees', existingBaseline.storeEmployees);
        setValue('staffTotal', staffTotal.value);
        setValue('noOfStaffOfficeSales', noOfStaffOfficeSales.value);
        setValue('noOfStaffOfficeAccounts', noOfStaffOfficeAccounts.value);
        setValue('noOfStaffOfficeGroupPurchasing', noOfStaffOfficeGroupPurchasing.value);
        setValue('noOfStaffOfficeStorePurchasing', noOfStaffOfficeStorePurchasing.value);
        setValue('noOfStaffStoreCustomerService', noOfStaffStoreCustomerService.value);
        setValue('noOfStaffStoreCashiers', noOfStaffStoreCashiers.value);
        setValue('noOfStaffStorePharmacy', noOfStaffStorePharmacy.value);
        setValue('noOfStaffStoreSalesFloor', noOfStaffStoreSalesFloor.value);
        setValue('noOfStaffStoreReceival', noOfStaffStoreReceival.value);
        setValue('wareHouseHiProStore', wareHouseHiProStore.value);
        setValue('noOfCustomersTotal', noOfCustomersTotal.value);
        setValue('noOfCustomersStore', noOfCustomersStore.value);
        setValue('noOfTransactionsTotal', noOfTransactionsTotal.value);
        setValue('noOfTransactionsItemDepartmentA', noOfTransactionsItemDepartmentA.value);
        setValue('noOfTransactionsItemDepartmentB', noOfTransactionsItemDepartmentB.value);
        setValue('noOfTransactionsItemDepartmentC', noOfTransactionsItemDepartmentC.value);
        setValue('noOfTransactionsItemDepartmentD', noOfTransactionsItemDepartmentD.value);
        setValue('noOfTransactionsItemDepartmentE', noOfTransactionsItemDepartmentE.value);
        setValue('truckDeliveriesTotal', truckDeliveriesTotal.value);
        setValue('truckDeliveriesTypeA', truckDeliveriesTypeA.value);
        setValue('truckDeliveriesTypeB', truckDeliveriesTypeB.value);
        setValue('truckDeliveriesTypeC', truckDeliveriesTypeC.value);
        setValue('truckDeliveriesTypeD', truckDeliveriesTypeD.value);
        return (
          <FieldSet className="baseline-field-set">
            <PageToolbar title={`ID`} className="no-margin" />
            <div className="baseline-field-group">
              <Field className="baseline-field" label="ID" invalid={!!errors.id} disabled={true}>
                <Input
                  {...register('id', { required: true })}
                  id="edit-baseline-id"
                  placeholder="ID"
                  value={id.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setId({ value });
                    setValue('id', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Date`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Day"
                invalid={!!errors.day}
                error="Invoice Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('day', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-truckDeliveriesTypeD"
                  placeholder="Truck deliveries – Type D"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setDay({ value });
                    setValue('day', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Staff`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Warehouse staff"
                invalid={!!errors.wareHouseStaff}
                error="Warehouse staff is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('wareHouseStaff', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="Production-warehouseStaff"
                  placeholder="Warehouse Staff"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setWareHouseStaff({ value });
                    setValue('wareHouseStaff', value);
                    console.log(value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Store employees / staff"
                invalid={!!errors.storeEmployees}
                error="Store employees / staff is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('storeEmployees', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="Production-storeEmployees"
                  placeholder="Store Employees"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setStoreEmployees({ value });
                    setValue('storeEmployees', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Staff - Total"
                invalid={!!errors.staffTotal}
                error="Staff - Total is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('staffTotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="Production-staffTotal"
                  placeholder="Staff - Total"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setStaffTotal({ value });
                    setValue('staffTotal', value);
                  }}
                />
              </Field>
              <br />
              <Field
                className="baseline-field"
                label="HiPro store & office staff"
                invalid={!!errors.wareHouseHiproStore}
                error="HiPro store & office staff is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('wareHousehiproStore', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="Production-hiproStore"
                  placeholder="HiPro store & office staff"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setWareHouseHiProStore({ value });
                    setValue('wareHouseHiproStore', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of staff – Office - Sales"
                invalid={!!errors.noOfStaffOfficeSales}
                error="staff – Office - Sale is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffOfficeSales', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffOfficeSales"
                  placeholder="staff – Office - Sale"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffOfficeSales({ value });
                    setValue('noOfStaffOfficeSales', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of staff – Office - Accounts"
                invalid={!!errors.noOfStaffOfficeAccounts}
                error="staff – Office - Accounts is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffOfficeAccounts', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffOfficeAccounts"
                  placeholder="staff – Office - Accounts"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffOfficeAccounts({ value });
                    setValue('noOfStaffOfficeAccounts', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of staff – Office - Group Purchasing"
                invalid={!!errors.noOfStaffOfficeGroupPurchasing}
                error="No. of staff – Office - Group Purchasing is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffOfficeGroupPurchasing', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffOfficeGroupPurchasing"
                  placeholder="No. of staff – Office - Group Purchasing                  "
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffOfficeGroupPurchasing({ value });
                    setValue('noOfStaffOfficeGroupPurchasing', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of staff – Office - Store Purchasing"
                invalid={!!errors.noOfStaffOfficeStorePurchasing}
                error="No. of staff – Office - Group Purchasing is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffOfficeStorePurchasing', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffOfficeStorePurchasing"
                  placeholder="No. of staff – Office - Store Purchasing"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffOfficeStorePurchasing({ value });
                    setValue('setNoOfStaffOfficeStorePurchasing', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of staff – Store - Customer Service"
                invalid={!!errors.noOfStaffStoreCustomerService}
                error="Customer Service is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffStoreCustomerService', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffStoreCustomerService"
                  placeholder="No. of staff – Store - Customer Service"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffStoreCustomerService({ value });
                    setValue('noOfStaffStoreCustomerService', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No of Staff - Store - Cashiers"
                invalid={!!errors.noOfStaffStoreCashiers}
                error="No of Staff - Store - Cashiers is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffStoreCashiers', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffStoreCashiers"
                  placeholder="No of Staff - Store - Cashiers"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffStoreCashiers({ value });
                    setValue('noOfStaffStoreCashiers', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No of Staff - Store - Pharmacy"
                invalid={!!errors.noOfStaffStorePharmacy}
                error="No of Staff - Store - Pharmacy
                is required [e.g. 24.53]"
              >
                <Input
                  {...register('noOfStaffStorePharmacy', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffStorePharmacy"
                  placeholder="No of Staff - Store - Pharmacy"
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffStorePharmacy({ value });
                    setValue('noOfStaffStorePharmacy', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No of Staff - Store - Sales Floor"
                invalid={!!errors.noOfStaffStoreSalesFloor}
                error="No of Staff - Store - Sales Floor is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffStoreSalesFloor', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffStoreSalesFloor"
                  placeholder="No of Staff - Store - Sales Floor"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffStoreSalesFloor({ value });
                    setValue('noOfStaffStoreSalesFloor', value);
                  }}
                />
              </Field>
              {/* 
              <Field
                className="baseline-field"
                label="No of Staff - Store - Warehouse HiPro store & office staff"
                invalid={!!errors.wareHouseHiProStore}
                error="Warehouse HiPro store  is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('wareHouseHiProStore', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-wareHouseHiProStore"
                  placeholder=" Warehouse HiPro store & office staff"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setWareHouseHiProStore({ value });
                    setValue('wareHouseHiProStore', value);
                  }}
                />
              </Field> */}
              <Field
                className="baseline-field"
                label="No of Staff - Store - Receival"
                invalid={!!errors.noOfStaffStoreReceival}
                error="Store - Receival is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffStoreReceival', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baselinenoOfStaffStoreReceival"
                  placeholder="Store - Receival"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfStaffStoreReceival({ value });
                    setValue('noOfStaffStoreReceival', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Customers`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label=" No. of customers - Total"
                invalid={!!errors.noOfCustomersTotal}
                error="No. of customers - Total is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfCustomersTotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfCustomersTotal"
                  placeholder="No. of customers - Total"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfCustomersTotal({ value });
                    setValue('noOfCustomersTotal', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of customers - Store"
                invalid={!!errors.noOfCustomersStore}
                error="No. of customers - Store is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfCustomersStore', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfCustomersStore"
                  placeholder="No. of customers - Store"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfCustomersStore({ value });
                    setValue('noOfCustomersStore', value);
                  }}
                />
              </Field>
              {/* <Field
                className="baseline-field"
                label="No. of customers - Warehouse"
                invalid={!!errors.noOfTransactionsTotal}
                error="No. of customers - Warehouse is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsTotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfTransactionsTotal"
                  placeholder="No. of customers"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOftransactionstotal({ value });
                    setValue('noOfTransactionsTotal', value);
                  }}
                />
              </Field> */}
              <Field
                className="baseline-field"
                label="No. of transactions – Total"
                invalid={!!errors.noOfTransactionsTotal}
                error="No. of transactions is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsTotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfTransactionsTotal"
                  placeholder="No. of transactions"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOftransactionstotal({ value });
                    setValue('noOfTransactionsTotal', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Transactions`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – A"
                invalid={!!errors.noOfTransactionsItemDepartmentA}
                error="No. of transactions Item/Department – A is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsItemDepartmentA', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfTransactionsItemDepartmentA"
                  placeholder=" Item/Department – A Charge"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfTransactionsItemDepartmentAe({ value });
                    setValue('noOfTransactionsItemDepartmentA', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – B"
                invalid={!!errors.noOfTransactionsItemDepartmentB}
                error="Item/Department – B is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsItemDepartmentB', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfTransactionsItemDepartmentB"
                  placeholder="Item/Department – B"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfTransactionsItemDepartmentB({ value });
                    setValue('noOfTransactionsItemDepartmentB', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – C"
                invalid={!!errors.noOfTransactionsItemDepartmentC}
                error=" Item/Department – c is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsItemDepartmentC', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfTransactionsItemDepartmentC"
                  placeholder="  Item/Department – C Charge"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfTransactionsItemDepartmentC({ value });
                    setValue('noOfTransactionsItemDepartmentC', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – D"
                invalid={!!errors.noOfTransactionsItemDepartmentD}
                error=" Item/Department – D is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsItemDepartmentD', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-noOfTransactionsItemDepartmentD"
                  placeholder=" Item/Department – D "
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfTransactionsItemDepartmentD({ value });
                    setValue('setNoOfTransactionsItemDepartmentD', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department - E"
                invalid={!!errors.noOfTransactionsItemDepartmentE}
                error="IPP Fixed Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfTransactionsItemDepartmentE', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfTransactionsItemDepartmentE"
                  placeholder="No. of transactions Item/Department - E"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfTransactionsItemDepartmentE({ value });
                    setValue('setNoOfTransactionsItemDepartmentE', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Deliveries`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Truck deliveries – Total"
                invalid={!!errors.truckDeliveriesTotal}
                error="Truck deliveriesis required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-truckDeliveriesTotal"
                  placeholder="Truck deliveries"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTotal({ value });
                    setValue('truckDeliveriesTotal', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type A"
                invalid={!!errors.truckDeliveriesTypeA}
                error="Truck deliveries – Type A is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypeA', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-truckDeliveriesTypeA"
                  placeholder="Truck deliveries – Type A"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypeA({ value });
                    setValue('truckDeliveriesTypeA', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type B"
                invalid={!!errors.truckDeliveriesTypeB}
                error="Truck deliveries – Type B is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypeB', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-truckDeliveriesTypeB"
                  placeholder="Truck deliveries – Type B"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypeB({ value });
                    setValue('truckDeliveriesTypeB', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type C"
                invalid={!!errors.truckDeliveriesTypeC}
                error="Truck deliveries – Type C is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypeC', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-truckDeliveriesTypeCe"
                  placeholder="Truck deliveries – Type C"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypeC({ value });
                    setValue('truckDeliveriesTypeC', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type D"
                invalid={!!errors.noOfTransactionsItemDepartmentE}
                error="Truck deliveries – Type D is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypeD', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-truckDeliveriesTypeD"
                  placeholder="Truck deliveries – Type D"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypeD({ value });
                    setValue('truckDeliveriesTypeD', value);
                  }}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <div className="gf-form-button-row">
                <Button variant="primary" disabled={isSavingBaselineEntry} aria-label="Baseline entry submit button">
                  Submit
                </Button>
              </div>
            </div>
          </FieldSet>
        );
      }}
    </Form>
  );
};

export default EditBaselineEntryForm;
