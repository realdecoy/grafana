import React, { FC, useEffect, useState } from 'react';
import { Button, DatePickerWithInput, Field, FieldSet, Form, Input, PageToolbar } from '@grafana/ui';
import { ProductionVolumeDTO } from 'app/types';
import { format } from 'date-fns';
const DATE_FORMAT = 'yyyy-MM-dd';

export interface Props {
  existingBaseline: ProductionVolumeDTO;
  isSavingBaselineEntry: boolean;
  updateBaselineEntry: (payload: ProductionVolumeDTO) => void;
}

export const EditBaselineEntryForm: FC<Props> = ({ existingBaseline, isSavingBaselineEntry, updateBaselineEntry }) => {
  const [isSaving, setIsSaving] = useState({ value: false });
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
  const [noOftransactionstotal, setNoOftransactionstotal] = useState({ value: '' });
  const [nooftransactionsitemdepartmenta, setNooftransactionsitemdepartmentae] = useState({ value: '' });
  const [nooftransactionsitemdepartmentb, setNooftransactionsitemdepartmentb] = useState({ value: '' });
  const [nooftransactionsitemdepartmentc, setNooftransactionsitemdepartmentc] = useState({ value: '' });
  const [nooftransactionsitemdepartmentd, setNooftransactionsitemdepartmentd] = useState({ value: '' });
  const [nooftransactionsitemdepartmente, setNooftransactionsitemdepartmente] = useState({ value: '' });
  const [truckDeliveriesTotal, setTruckDeliveriesTotal] = useState({ value: '' });
  const [truckDeliveriesTypea, setTruckDeliveriesTypea] = useState({ value: '' });
  const [truckDeliveriesTypeb, setTruckDeliveriesTypeb] = useState({ value: '' });
  const [truckDeliveriesTypec, setTruckDeliveriesTypec] = useState({ value: '' });
  const [truckDeliveriesTyped, setTruckDeliveriesTyped] = useState({ value: '' });


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
      noOftransactionstotal: noOftransactionstotal.value,
      nooftransactionsitemdepartmenta: nooftransactionsitemdepartmenta.value,
      nooftransactionsitemdepartmentb: nooftransactionsitemdepartmentb.value,
      nooftransactionsitemdepartmentc: nooftransactionsitemdepartmentc.value,
      nooftransactionsitemdepartmentd: nooftransactionsitemdepartmentd.value,
      nooftransactionsitemdepartmente: nooftransactionsitemdepartmente.value,
      truckDeliveriesTotal: truckDeliveriesTotal.value,
      truckDeliveriesTypea: truckDeliveriesTypea.value,
      truckDeliveriesTypeb: truckDeliveriesTypeb.value,
      truckDeliveriesTypec: truckDeliveriesTypec.value,
      truckDeliveriesTyped: truckDeliveriesTyped.value,
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
    setNoOftransactionstotal({ value: existingBaseline.noOftransactionstotal as string });
    setNooftransactionsitemdepartmentae({ value: existingBaseline.nooftransactionsitemdepartmenta as string });
    setNooftransactionsitemdepartmentb({ value: existingBaseline.nooftransactionsitemdepartmentb as string });
    setNooftransactionsitemdepartmentc({ value: existingBaseline.nooftransactionsitemdepartmentc as string });
    setNooftransactionsitemdepartmentd({ value: existingBaseline.nooftransactionsitemdepartmentd as string });
    setNooftransactionsitemdepartmente({ value: existingBaseline.nooftransactionsitemdepartmente as string });
    setTruckDeliveriesTotal({ value: existingBaseline.truckDeliveriesTotal as string });
    setTruckDeliveriesTypea({ value: existingBaseline.truckDeliveriesTypea as string });
    setTruckDeliveriesTypeb({ value: existingBaseline.truckDeliveriesTypeb as string });
    setTruckDeliveriesTypeb({ value: existingBaseline.truckDeliveriesTypec as string });
    setTruckDeliveriesTypec({ value: existingBaseline.truckDeliveriesTyped as string });
  }, [existingBaseline]);

  useEffect(() => {
    setIsSaving({ value: isSavingBaselineEntry });
  }, [isSavingBaselineEntry]);

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
        setValue('noOftransactionstotal', noOftransactionstotal.value);
        setValue('nooftransactionsitemdepartmenta', nooftransactionsitemdepartmenta.value);
        setValue('nooftransactionsitemdepartmentb', nooftransactionsitemdepartmentb.value);
        setValue('nooftransactionsitemdepartmentc', nooftransactionsitemdepartmentc.value);
        setValue('nooftransactionsitemdepartmentd', nooftransactionsitemdepartmentd.value);
        setValue('nooftransactionsitemdepartmente', nooftransactionsitemdepartmente.value);
        setValue('truckDeliveriesTotal', truckDeliveriesTotal.value);
        setValue('truckDeliveriesTypea', truckDeliveriesTypea.value);
        setValue('truckDeliveriesTypeb', truckDeliveriesTypeb.value);
        setValue('truckDeliveriesTypec', truckDeliveriesTypec.value);
        setValue('truckDeliveriesTyped', truckDeliveriesTyped.value);
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
                <DatePickerWithInput
                  id="Production-Day"
                  placeholder="Day"
                  closeOnSelect={true}
                  {...register('day', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const value = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-invoice-date') as HTMLInputElement;
                    el.value = value;
                    setDay({ value });
                    setValue('day', value, { shouldValidate: true });

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
                    console.log(value)
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
                invalid={!!errors.hiproStore}
                error="HiPro store & office staff is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('hiproStore', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="Production-hiproStore"
                  placeholder="HiPro store & office staff"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setWareHouseHiProStore({ value });
                    setValue('hiproStore', value);
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
                invalid={!!errors.noOftransactionstotal}
                error="No. of customers - Warehouse is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOftransactionstotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOftransactionstotal"
                  placeholder="No. of customers"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOftransactionstotal({ value });
                    setValue('noOftransactionstotal', value);
                  }}
                />
              </Field> */}
              <Field
                className="baseline-field"
                label="No. of transactions – Total"
                invalid={!!errors.noOftransactionstotal}
                error="No. of transactions is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOftransactionstotal', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOftransactionstotal"
                  placeholder="No. of transactions"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOftransactionstotal({ value });
                    setValue('noOftransactionstotal', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Transactions`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – A"
                invalid={!!errors.nooftransactionsitemdepartmenta}
                error="No. of transactions Item/Department – A is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('nooftransactionsitemdepartmenta', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-nooftransactionsitemdepartmenta"
                  placeholder=" Item/Department – A Charge"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNooftransactionsitemdepartmentae({ value });
                    setValue('nooftransactionsitemdepartmenta', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – B"
                invalid={!!errors.nooftransactionsitemdepartmentb}
                error="Item/Department – B is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('nooftransactionsitemdepartmentb', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-nooftransactionsitemdepartmentb"
                  placeholder="Item/Department – B"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNooftransactionsitemdepartmentb({ value });
                    setValue('nooftransactionsitemdepartmentb', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – C"
                invalid={!!errors.nooftransactionsitemdepartmentc}
                error=" Item/Department – c is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('nooftransactionsitemdepartmentc', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-nooftransactionsitemdepartmentc"
                  placeholder="  Item/Department – C Charge"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNooftransactionsitemdepartmentc({ value });
                    setValue('nooftransactionsitemdepartmentc', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department – D"
                invalid={!!errors.nooftransactionsitemdepartmentd}
                error=" Item/Department – D is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('nooftransactionsitemdepartmentd', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-nooftransactionsitemdepartmentd"
                  placeholder=" Item/Department – D "
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNooftransactionsitemdepartmentd({ value });
                    setValue('setNooftransactionsitemdepartmentd', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. of transactions Item/Department - E"
                invalid={!!errors.nooftransactionsitemdepartmente}
                error="IPP Fixed Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('nooftransactionsitemdepartmente', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-nooftransactionsitemdepartmente"
                  placeholder="No. of transactions Item/Department - E"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNooftransactionsitemdepartmente({ value });
                    setValue('setNooftransactionsitemdepartmente', value);
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
                invalid={!!errors.truckDeliveriesTypea}
                error="Truck deliveries – Type A is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypea', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-truckDeliveriesTypea"
                  placeholder="Truck deliveries – Type A"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypea({ value });
                    setValue('truckDeliveriesTypea', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type B"
                invalid={!!errors.truckDeliveriesTypeb}
                error="Truck deliveries – Type B is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypeb', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-truckDeliveriesTypeb"
                  placeholder="Truck deliveries – Type B"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypeb({ value });
                    setValue('truckDeliveriesTypeb', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type C"
                invalid={!!errors.truckDeliveriesTypec}
                error="Truck deliveries – Type C is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTypec', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-truckDeliveriesTypece"
                  placeholder="Truck deliveries – Type C"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTypec({ value });
                    setValue('truckDeliveriesTypec', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type D"
                invalid={!!errors.nooftransactionsitemdepartmente}
                error="Truck deliveries – Type D is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTyped', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-truckDeliveriesTyped"
                  placeholder="Truck deliveries – Type D"
                  defaultValue={''}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setTruckDeliveriesTyped({ value });
                    setValue('truckDeliveriesTyped', value);
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
