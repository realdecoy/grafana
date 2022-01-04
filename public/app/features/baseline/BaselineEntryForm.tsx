import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import { Button, DatePickerWithInput, Field, FieldSet, Form, Input, PageToolbar } from '@grafana/ui';
import { BaselineEntryFields } from './types';
import Dropzone from 'react-dropzone';

const DATE_FORMAT = 'yyyy-MM-dd';

export interface Props {
  isSavingBaselineEntry: boolean;
  addBaselineEntry: (payload: BaselineEntryFields) => void;
}

export const BaselineEntryForm: FC<Props> = ({ isSavingBaselineEntry, addBaselineEntry }) => {
  const [isSaving] = useState({ value: false });
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

  const onSubmitBaselineEntry = (data: BaselineEntryFields) => {
    addBaselineEntry(data);
    clearForm();
  };
  const clearForm = () => {
    (document.getElementById('baseline-entry-form') as HTMLInputElement & {
      reset: () => boolean;
    }).reset();

    setId({ value: '' });
    setStartDate({ value: '' });
    setEndDate({ value: '' });
    setNoOfDays({ value: '' });
    setInvoiceDate({ value: '' });
    setKwh({ value: '' });
    setMinKw({ value: '' });
    setMaxKw({ value: '' });
    setAvgKw({ value: '' });
    setAvgKva({ value: '' });
    setPf({ value: '' });
    setMinPf({ value: '' });
    setMaxPf({ value: '' });
    setRate({ value: '' });
    setEnergyRate({ value: '' });
    setFuelRate({ value: '' });
    setKvaRate({ value: '' });
    setIppRate({ value: '' });
    setIppVariableRate({ value: '' });
    setIppFixedRate({ value: '' });
    setEnergyCharge({ value: '' });
    setFuelCharge({ value: '' });
    setIppCharge({ value: '' });
    setIppVariableCharge({ value: '' });
    setIppFixedCharge({ value: '' });
    setKvaCharge({ value: '' });
    setCurrentCharges({ value: '' });
    setSalesTax({ value: '' });
  };

  const onSubmit = (data: any) => {
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
    clearForm();
  };

  return (
    <Form id="baseline-entry-form" className="baseline-entry-form" onSubmit={onSubmit} validateOn="onBlur">
      {({ register, errors, clearErrors, setValue }) => {
        return (
          <FieldSet className="baseline-field-set">
            <PageToolbar title={`Date`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Start Date"
                invalid={!!errors.startDate}
                error="Start Date is required"
                disabled={isSaving.value}
              >
                <DatePickerWithInput
                  id="baseline-start-date"
                  placeholder="startDate"
                  closeOnSelect={true}
                  {...register('startDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-start-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('startDate', formattedValue, { shouldValidate: true });
                    setStartDate({ value: formattedValue });
                  }}
                />
              </Field>

              <Field
                className="baseline-field"
                label="End Date"
                invalid={!!errors.endDate}
                error="End Date is required"
                disabled={isSaving.value}
              >
                <DatePickerWithInput
                  id="baseline-end-date"
                  placeholder="endDate"
                  closeOnSelect={true}
                  {...register('endDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-end-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setEndDate({ value: formattedValue });
                    setValue('endDate', formattedValue, { shouldValidate: true });
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. Of Days"
                invalid={!!errors.noOfDays}
                error="No. of Days nust me a number [e.g. 30]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('noOfDays', { required: true, pattern: /^[0-9]+$/g })}
                  id="baseline-no-of-days"
                  placeholder="No. Of Days"
                  value={noOfDays.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setNoOfDays({ value });
                    setValue('noOfDays', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Invoice Date"
                invalid={!!errors.invoiceDate}
                error="Invoice Date is required"
                disabled={isSaving.value}
              >
                <DatePickerWithInput
                  id="baseline-invoice-date"
                  placeholder="invoiceDate"
                  closeOnSelect={true}
                  {...register('invoiceDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('baseline-invoice-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setInvoiceDate({ value: formattedValue });
                    setValue('invoiceDate', formattedValue, { shouldValidate: true });
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Readings`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Kilowatt-hour (kWh)"
                invalid={!!errors.kwh}
                error="kWh is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('kwh', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-kwh"
                  placeholder="kWh"
                  value={kwh.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setKwh({ value });
                    setValue('kwh', value);
                    // calculate energyCharge automatically if values present
                    if (value.length > 0 && energyRate.value.length > 0) {
                      const energyCharge = parseFloat(value) * parseFloat(energyRate.value);
                      setEnergyCharge({ value: energyCharge.toString() });
                    }
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Minimum kW"
                invalid={!!errors.minKw}
                error="Min. kW is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('minKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-min-kw"
                  placeholder="Min. kW"
                  value={minKw.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setMinKw({ value });
                    setValue('minKw', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Maximum kW"
                invalid={!!errors.maxKw}
                error="Max. kW is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('maxKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-max-kw"
                  placeholder="Max. kW"
                  value={maxKw.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setMaxKw({ value });
                    setValue('maxKw', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Average kW"
                invalid={!!errors.avgKw}
                error="Average kW is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('avgKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-avg-kw"
                  placeholder="Average kW"
                  value={avgKw.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setAvgKw({ value });
                    setValue('avgKw', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Average kVA"
                invalid={!!errors.avgKva}
                error="Average kVA is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('avgKva', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-avg-kva"
                  placeholder="Average kVA"
                  value={avgKva.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setAvgKva({ value });
                    setValue('avgKva', value);
                    // calculate kvaCharge automatically if values present
                    if (value.length > 0 && kvaRate.value.length > 0) {
                      const kvaCharge = parseFloat(value) * parseFloat(kvaRate.value);
                      setKvaCharge({ value: kvaCharge.toString() });
                    }
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Power Factor (PF)"
                invalid={!!errors.pf}
                error="PF is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('pf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-pf"
                  placeholder="PF"
                  value={pf.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setPf({ value });
                    setValue('pf', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Minimum PF"
                invalid={!!errors.minPf}
                error="Min. PF is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('minPf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-min-pf"
                  placeholder="Min. PF"
                  value={minPf.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setMinPf({ value });
                    setValue('minPf', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Maximum PF"
                invalid={!!errors.maxPf}
                error="Max. PF is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('maxPf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-max-pf"
                  placeholder="Max. PF"
                  value={maxPf.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setMaxPf({ value });
                    setValue('maxPf', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Rates`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Rate"
                invalid={!!errors.rate}
                error="Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('rate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-rate"
                  placeholder="Rate"
                  value={rate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setRate({ value });
                    setValue('rate', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Energy Rate"
                invalid={!!errors.energyRate}
                error="Energy Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('energyRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-energy-rate"
                  placeholder="Energy Rate"
                  value={energyRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setEnergyRate({ value });
                    setValue('energyRate', value);
                    // calculate energyCharge automatically if values present
                    if (value.length > 0 && kwh.value.length > 0) {
                      const energyCharge = parseFloat(value) * parseFloat(kwh.value);
                      setEnergyCharge({ value: energyCharge.toString() });
                    }
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel Rate"
                invalid={!!errors.fuelRate}
                error="Fuel Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('fuelRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-fuel-rate"
                  placeholder="Fuel Rate"
                  value={fuelRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setFuelRate({ value });
                    setValue('fuelRate', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="KVA Rate"
                invalid={!!errors.kvaRate}
                error="KVA Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('kvaRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-kva-rate"
                  placeholder="KVA Rate"
                  value={kvaRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setKvaRate({ value });
                    setValue('kvaRate', value);
                    // calculate kvaCharge automatically if values present
                    if (value.length > 0 && avgKva.value.length > 0) {
                      const kvaCharge = parseFloat(value) * parseFloat(avgKva.value);
                      setKvaCharge({ value: kvaCharge.toString() });
                    }
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel & IPP Rate"
                invalid={!!errors.ippRate}
                error="Fuel & IPP Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('ippRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-rate"
                  placeholder="Fuel & IPP Rate"
                  value={ippRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setIppRate({ value });
                    setValue('ippRate', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="IPP Variable Rate"
                invalid={!!errors.ippVariableRate}
                error="IPP Variable Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('ippVariableRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-variable-rate"
                  placeholder="IPP Variable Rate"
                  value={ippVariableRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setIppVariableRate({ value });
                    setValue('ippVariableRate', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="IPP Fixed Rate"
                invalid={!!errors.ippFixedRate}
                error="IPP Fixed Rate is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('ippFixedRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-Fixed-rate"
                  placeholder="IPP Fixed Rate"
                  value={ippFixedRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setIppFixedRate({ value });
                    setValue('ippFixedRate', value);
                  }}
                />
              </Field>
            </div>
            <PageToolbar title={`Charges`} className="no-margin" />
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Energy Charge"
                invalid={!!errors.energyCharge}
                error="Energy Charge is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('energyCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-energy-charge"
                  placeholder="Energy Charge"
                  value={energyCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setEnergyCharge({ value });
                    setValue('energyCharge', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel Charge"
                invalid={!!errors.fuelCharge}
                error="Fuel Charge is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('fuelCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-fuel-charge"
                  placeholder="Fuel Charge"
                  value={fuelCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setFuelCharge({ value });
                    setValue('fuelCharge', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel & IPP Charge"
                invalid={!!errors.ippCharge}
                error="Fuel & IPP Charge is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('ippCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-charge"
                  placeholder="Fuel & IPP charge"
                  value={ippCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setIppCharge({ value });
                    setValue('ippCharge', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="IPP Variable Charge"
                invalid={!!errors.ippVariableCharge}
                error="IPP Variable Charge is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('ippVariableCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-variable-charge"
                  placeholder="IPP Variable Charge"
                  value={ippVariableCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setIppVariableCharge({ value });
                    setValue('ippVariableCharge', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="IPP Fixed Charge"
                invalid={!!errors.ippFixedCharge}
                error="IPP Fixed Charge is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('ippFixedCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-ipp-Fixed-charge"
                  placeholder="IPP Fixed Charge"
                  value={ippFixedCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setIppFixedCharge({ value });
                    setValue('ippFixedCharge', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="KVA Charge"
                invalid={!!errors.kvaCharge}
                error="KVA Charge is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('kvaCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-kva-charge"
                  placeholder="KVA Charge"
                  value={kvaCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setKvaCharge({ value });
                    setValue('kvaCharge', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Current Charges"
                invalid={!!errors.currentCharges}
                error="Current Charges is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('currentCharges', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-current-charge"
                  placeholder="Current Charges"
                  value={currentCharges.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setCurrentCharges({ value });
                    setValue('currentCharges', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Sales Tax"
                invalid={!!errors.salesTax}
                error="Sales Tax is required [e.g. 24.53]"
                disabled={isSaving.value}
              >
                <Input
                  {...register('salesTax', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="baseline-current-charge"
                  placeholder="Sales Tax"
                  value={salesTax.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setSalesTax({ value });
                    setValue('salesTax', value);
                  }}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <div className="gf-form-button-row">
                <Button variant="primary" disabled={isSaving.value} aria-label="Baseline entry submit button">
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

export default BaselineEntryForm;
