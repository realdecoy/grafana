import React, { FC, useEffect, useState } from 'react';
import { Button, DatePickerWithInput, Field, FieldSet, Form, Input, PageToolbar } from '@grafana/ui';
import { BaselineDTO } from 'app/types';

export interface Props {
  existingBaseline: BaselineDTO;
  isSavingBaselineEntry: boolean;
  updateBaselineEntry: (payload: BaselineDTO) => void;
}

export const EditBaselineEntryForm: FC<Props> = ({ existingBaseline, isSavingBaselineEntry, updateBaselineEntry }) => {
  const [isSaving, setIsSaving] = useState({ value: false });
  const [id, setId] = useState({ value: '' });
  const [startDate, setStartDate] = useState({ value: '' });
  const [endDate, setEndDate] = useState({ value: '' });
  const [noOfDays, setNoOfDays] = useState({ value: '' });
  const [invoiceDate, setInvoiceDate] = useState({ value: '' });
  const [kwh, setKwh] = useState({ value: '' });
  const [minKw, setMinKw] = useState({ value: '' });
  const [maxKw, setMaxKw] = useState({ value: '' });
  const [avgKw, setAvgKw] = useState({ value: '' });
  const [avgKva, setAvgKva] = useState({ value: '' });
  const [pf, setPf] = useState({ value: '' });
  const [minPf, setMinPf] = useState({ value: '' });
  const [maxPf, setMaxPf] = useState({ value: '' });
  const [rate, setRate] = useState({ value: '' });
  const [energyRate, setEnergyRate] = useState({ value: '' });
  const [fuelRate, setFuelRate] = useState({ value: '' });
  const [kvaRate, setKvaRate] = useState({ value: '' });
  const [ippRate, setIppRate] = useState({ value: '' });
  const [ippVariableRate, setIppVariableRate] = useState({ value: '' });
  const [ippFixedRate, setIppFixedRate] = useState({ value: '' });
  const [energyCharge, setEnergyCharge] = useState({ value: '' });
  const [fuelCharge, setFuelCharge] = useState({ value: '' });
  const [ippCharge, setIppCharge] = useState({ value: '' });
  const [ippVariableCharge, setIppVariableCharge] = useState({ value: '' });
  const [ippFixedCharge, setIppFixedCharge] = useState({ value: '' });
  const [kvaCharge, setKvaCharge] = useState({ value: '' });
  const [currentCharges, setCurrentCharges] = useState({ value: '' });
  const [salesTax, setSalesTax] = useState({ value: '' });

  const onSubmitBaselineEntry = (data: BaselineDTO) => {
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
      startDate: startDate.value,
      endDate: endDate.value,
      noOfDays: noOfDays.value,
      invoiceDate: invoiceDate.value,
      kwh: kwh.value,
      minKw: minKw.value,
      maxKw: maxKw.value,
      avgKw: avgKw.value,
      avgKva: avgKva.value,
      pf: pf.value,
      minPf: minPf.value,
      maxPf: maxPf.value,
      rate: rate.value,
      energyRate: energyRate.value,
      fuelRate: fuelRate.value,
      kvaRate: kvaRate.value,
      ippRate: ippRate.value,
      ippVariableRate: ippVariableRate.value,
      ippFixedRate: ippFixedRate.value,
      energyCharge: energyCharge.value,
      fuelCharge: fuelCharge.value,
      ippCharge: ippCharge.value,
      ippVariableCharge: ippVariableCharge.value,
      ippFixedCharge: ippFixedCharge.value,
      kvaCharge: kvaCharge.value,
      currentCharges: currentCharges.value,
      salesTax: salesTax.value,
    };
    onSubmitBaselineEntry(trueData);
  };

  useEffect(() => {
    setId({ value: existingBaseline.id as string });
    setStartDate({ value: existingBaseline.startDate });
    setEndDate({ value: existingBaseline.endDate });
    setNoOfDays({ value: existingBaseline.noOfDays as string });
    setInvoiceDate({ value: existingBaseline.invoiceDate });
    setKwh({ value: existingBaseline.kwh as string });
    setMinKw({ value: existingBaseline.minKw as string });
    setMaxKw({ value: existingBaseline.maxKw as string });
    setAvgKw({ value: existingBaseline.avgKw as string });
    setAvgKva({ value: existingBaseline.avgKva as string });
    setPf({ value: existingBaseline.pf as string });
    setMinPf({ value: existingBaseline.minPf as string });
    setMaxPf({ value: existingBaseline.maxPf as string });
    setRate({ value: existingBaseline.rate as string });
    setEnergyRate({ value: existingBaseline.energyRate as string });
    setFuelRate({ value: existingBaseline.fuelRate as string });
    setKvaRate({ value: existingBaseline.kvaRate as string });
    setIppRate({ value: existingBaseline.ippRate as string });
    setIppVariableRate({ value: existingBaseline.ippVariableRate as string });
    setIppFixedRate({ value: existingBaseline.ippFixedRate as string });
    setEnergyCharge({ value: existingBaseline.energyCharge as string });
    setFuelCharge({ value: existingBaseline.fuelCharge as string });
    setIppCharge({ value: existingBaseline.ippCharge as string });
    setIppVariableCharge({ value: existingBaseline.ippVariableCharge as string });
    setIppFixedCharge({ value: existingBaseline.ippFixedCharge as string });
    setKvaCharge({ value: existingBaseline.kvaCharge as string });
    setCurrentCharges({ value: existingBaseline.currentCharges as string });
    setSalesTax({ value: existingBaseline.salesTax as string });
  }, [existingBaseline]);

  useEffect(() => {
    setIsSaving({ value: isSavingBaselineEntry });
  }, [isSavingBaselineEntry]);

  return (
    <Form id="edit-baseline-entry-form" className="edit-baseline-entry-form" onSubmit={onSubmit} validateOn="onBlur">
      {({ register, errors, clearErrors, setValue }) => {
        // const isValidStartDate = new Date(existingBaseline.startDate).toString() !== 'Invalid Date';
        // const isValidEndDate = new Date(existingBaseline.endDate).toString() !== 'Invalid Date';
        // const isValidInvoiceDate = new Date(existingBaseline.invoiceDate).toString() !== 'Invalid Date';
        // setValue('id', id.value);
        // setValue('startDate', existingBaseline.startDate);
        // setValue('endDate', existingBaseline.endDate);
        // setValue('noOfDays', noOfDays.value);
        // setValue('invoiceDate', existingBaseline.invoiceDate);
        // setValue('kwh', kwh.value);
        // setValue('minKw', minKw.value);
        // setValue('maxKw', maxKw.value);
        // setValue('avgKw', avgKw.value);
        // setValue('avgKva', avgKva.value);
        // setValue('pf', pf.value);
        // setValue('minPf', minPf.value);
        // setValue('maxPf', maxPf.value);
        // setValue('rate', rate.value);
        // setValue('energyRate', energyRate.value);
        // setValue('fuelRate', fuelRate.value);
        // setValue('kvaRate', kvaRate.value);
        // setValue('ippRate', ippRate.value);
        // setValue('ippVariableRate', ippVariableRate.value);
        // setValue('ippFixedRate', ippFixedRate.value);
        // setValue('energyCharge', energyCharge.value);
        // setValue('fuelCharge', fuelCharge.value);
        // setValue('ippCharge', ippCharge.value);
        // setValue('ippVariableCharge', ippVariableCharge.value);
        // setValue('ippFixedCharge', ippFixedCharge.value);
        // setValue('kvaCharge', kvaCharge.value);
        // setValue('currentCharges', currentCharges.value);
        // setValue('salesTax', salesTax.value);
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
                invalid={!!errors.invoiceDate}
                error="Invoice Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="baseline-invoice-date"
                  placeholder="Day"
                  closeOnSelect={true}
                  {...register('day', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-invoice-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('day', formattedValue, { shouldValidate: true });
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
                />
              </Field>
              <Field
                className="baseline-field"
                label="No of Staff - Store - Pharmacy"
                invalid={!!errors.noOfStaffStorePharmacy}
                error="No of Staff - Store - Pharmacy
                is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfStaffStorePharmacy', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-noOfStaffStorePharmacy"
                  placeholder="No of Staff - Store - Pharmacy"
                  defaultValue={''}
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
                />
              </Field>

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
                />
              </Field>
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
                />
              </Field>
              <Field
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
                />
              </Field>
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
                />
              </Field>
              <Field
                className="baseline-field"
                label="Truck deliveries – Type D"
                invalid={!!errors.ippFixedCharge}
                error="Truck deliveries – Type D is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('truckDeliveriesTyped', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-truckDeliveriesTyped"
                  placeholder="Truck deliveries – Type D"
                  defaultValue={''}
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
