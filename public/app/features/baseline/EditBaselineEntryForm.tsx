import React, { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button, DatePickerWithInput, Field, FieldSet, Form, Input } from '@grafana/ui';
import { BaselineDTO } from 'app/types';

const DATE_FORMAT = 'yyyy-MM-dd';

export interface Props {
  existingBaseline: BaselineDTO;
  isSavingBaselineEntry: boolean;
  updateBaselineEntry: (payload: BaselineDTO) => void;
}

export const EditBaselineEntryForm: FC<Props> = ({ existingBaseline, isSavingBaselineEntry, updateBaselineEntry }) => {
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
  const [energyCharge, setEnergyCharge] = useState({ value: '' });
  const [ippCharge, setIppCharge] = useState({ value: '' });
  const [ippVariableCharge, setIppVariableCharge] = useState({ value: '' });
  const [kvaCharge, setKvaCharge] = useState({ value: '' });
  const [currentCharges, setCurrentCharges] = useState({ value: '' });
  const [salesTax, setSalesTax] = useState({ value: '' });

  // console.log(existingBaseline);
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
    console.log(data);
    onSubmitBaselineEntry(data);
  };

  useEffect(() => {
    const isValidStartDate = new Date(existingBaseline.startDate).toString() !== 'Invalid Date';
    const isValidEndDate = new Date(existingBaseline.endDate).toString() !== 'Invalid Date';
    const isValidInvoiceDate = new Date(existingBaseline.invoiceDate).toString() !== 'Invalid Date';
    console.log(existingBaseline);
    setId({ value: existingBaseline.id as string });
    setStartDate({ value: isValidStartDate ? format(new Date(existingBaseline.startDate), DATE_FORMAT) : '' });
    setEndDate({ value: isValidEndDate ? format(new Date(existingBaseline.endDate), DATE_FORMAT) : '' });
    setNoOfDays({ value: existingBaseline.noOfDays as string });
    setInvoiceDate({ value: isValidInvoiceDate ? format(new Date(existingBaseline.invoiceDate), DATE_FORMAT) : '' });
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
    setEnergyCharge({ value: existingBaseline.energyCharge as string });
    setIppCharge({ value: existingBaseline.ippCharge as string });
    setIppVariableCharge({ value: existingBaseline.ippVariableCharge as string });
    setKvaCharge({ value: existingBaseline.kvaCharge as string });
    setCurrentCharges({ value: existingBaseline.currentCharges as string });
    setSalesTax({ value: existingBaseline.salesTax as string });
  }, [existingBaseline]);

  return (
    <Form id="edit-baseline-entry-form" className="edit-baseline-entry-form" onSubmit={onSubmit} validateOn="onBlur">
      {({ register, errors, clearErrors, setValue }) => {
        const isValidStartDate = new Date(existingBaseline.startDate).toString() !== 'Invalid Date';
        const isValidEndDate = new Date(existingBaseline.endDate).toString() !== 'Invalid Date';
        const isValidInvoiceDate = new Date(existingBaseline.invoiceDate).toString() !== 'Invalid Date';
        setValue('id', id.value);
        setValue('startDate', isValidStartDate ? format(new Date(existingBaseline.startDate), DATE_FORMAT) : '');
        setValue('endDate', isValidEndDate ? format(new Date(existingBaseline.endDate), DATE_FORMAT) : '');
        setValue('noOfDays', noOfDays.value);
        setValue('invoiceDate', isValidInvoiceDate ? format(new Date(existingBaseline.invoiceDate), DATE_FORMAT) : '');
        setValue('kwh', kwh.value);
        setValue('minKw', minKw.value);
        setValue('maxKw', maxKw.value);
        setValue('avgKw', avgKw.value);
        setValue('avgKva', avgKva.value);
        setValue('pf', pf.value);
        setValue('minPf', minPf.value);
        setValue('maxPf', maxPf.value);
        setValue('rate', rate.value);
        setValue('energyRate', energyRate.value);
        setValue('fuelRate', fuelRate.value);
        setValue('kvaRate', kvaRate.value);
        setValue('ippRate', ippRate.value);
        setValue('ippVariableRate', ippVariableRate.value);
        setValue('energyCharge', energyCharge.value);
        setValue('ippCharge', ippCharge.value);
        setValue('ippVariableCharge', ippVariableCharge.value);
        setValue('kvaCharge', kvaCharge.value);
        setValue('currentCharges', currentCharges.value);
        setValue('salesTax', salesTax.value);
        return (
          <FieldSet className="edit-baseline-field-set">
            <div className="baseline-field-group">
              <Field className="baseline-field" label="ID" invalid={!!errors.id} disabled={false}>
                <Input
                  {...register('id', { required: true })}
                  id="edit-baseline-id"
                  placeholder="ID"
                  value={id.value}
                  onChange={(event) => {
                    console.log(event);
                    const value = event?.currentTarget.value;
                    alert(value);
                    setId({ value });
                    setValue('id', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Start Date"
                invalid={!!errors.startDate}
                error="Start Date is required"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="edit-baseline-start-date"
                  placeholder="Start Date"
                  closeOnSelect={true}
                  value={startDate.value}
                  {...register('startDate', {
                    required: true,
                  })}
                  onChange={(val) => {
                    console.log(`[change] ${val}`);
                    if (val) {
                      const formattedValue = format(new Date(val), DATE_FORMAT);
                      const el = document.getElementById('edit-baseline-start-date') as HTMLInputElement;
                      el.value = formattedValue;
                      setStartDate({ value: formattedValue });
                      setValue('startDate', formattedValue);
                    }
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="End Date"
                invalid={!!errors.endDate}
                error="End Date is required"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="edit-baseline-end-date"
                  placeholder="End Date"
                  closeOnSelect={true}
                  value={endDate.value}
                  {...register('endDate', {
                    required: true,
                  })}
                  onChange={(val) => {
                    console.log(`[change] ${val}`);
                    if (val) {
                      const formattedValue = format(new Date(val), DATE_FORMAT);
                      const el = document.getElementById('edit-baseline-end-date') as HTMLInputElement;
                      el.value = formattedValue;
                      setEndDate({ value: formattedValue });
                      setValue('endDate', formattedValue);
                    }
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="No. Of Days"
                invalid={!!errors.noOfDays}
                error="No. of Days nust me a number [e.g. 30]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('noOfDays', { required: true, pattern: /^[0-9]+$/g })}
                  id="edit-baseline-no-of-days"
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
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="edit-baseline-invoice-date"
                  placeholder="Invoice Date"
                  closeOnSelect={true}
                  value={invoiceDate.value}
                  {...register('invoiceDate', {
                    required: true,
                  })}
                  onChange={(val) => {
                    console.log(`[change] ${val}`);
                    if (val) {
                      const formattedValue = format(new Date(val), DATE_FORMAT);
                      const el = document.getElementById('edit-baseline-invoice-date') as HTMLInputElement;
                      el.value = formattedValue;
                      console.log(formattedValue);
                      setInvoiceDate({ value: formattedValue });
                      setValue('invoiceDate', formattedValue);
                    }
                  }}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Kilowatt-hour (kWh)"
                invalid={!!errors.kwh}
                error="kWh is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('kwh', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-kwh"
                  placeholder="kWh"
                  value={kwh.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    alert(value);
                    setKwh({ value });
                    setValue('kwh', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Minimum kW"
                invalid={!!errors.minKw}
                error="Min. kW is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('minKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-min-kw"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('maxKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-max-kw"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('avgKw', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-avg-kw"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('avgKva', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-avg-kva"
                  placeholder="Average kVA"
                  value={avgKva.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setAvgKva({ value });
                    setValue('avgKva', value);
                  }}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Power Factor (PF)"
                invalid={!!errors.pf}
                error="PF is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('pf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-pf"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('minPf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-min-pf"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('maxPf', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-max-pf"
                  placeholder="Max. PF"
                  value={maxPf.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setMaxPf({ value });
                    setValue('maxPf', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Rate"
                invalid={!!errors.rate}
                error="Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('rate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-rate"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('energyRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-energy-rate"
                  placeholder="Energy Rate"
                  value={energyRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setEnergyRate({ value });
                    setValue('energyRate', value);
                  }}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Fuel Rate"
                invalid={!!errors.fuelRate}
                error="Fuel Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('fuelRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-fuel-rate"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('kvaRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-kva-rate"
                  placeholder="KVA Rate"
                  value={kvaRate.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setKvaRate({ value });
                    setValue('kvaRate', value);
                  }}
                />
              </Field>
              <Field
                className="baseline-field"
                label="Fuel & IPP Rate"
                invalid={!!errors.ippRate}
                error="Fuel & IPP Rate is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-ipp-rate"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippVariableRate', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-ipp-variable-rate"
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
                label="Energy Charge"
                invalid={!!errors.energyCharge}
                error="Energy Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('energyCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-energy-charge"
                  placeholder="Energy Charge"
                  value={energyCharge.value}
                  onChange={(event) => {
                    const value = event?.currentTarget.value;
                    setEnergyCharge({ value });
                    setValue('energyCharge', value);
                  }}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Fuel & IPP Charge"
                invalid={!!errors.ippCharge}
                error="Fuel & IPP Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-ipp-charge"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('ippVariableCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-ipp-variable-charge"
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
                label="KVA Charge"
                invalid={!!errors.kvaCharge}
                error="KVA Charge is required [e.g. 24.53]"
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('kvaCharge', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-kva-charge"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('currentCharges', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-current-charge"
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
                disabled={isSavingBaselineEntry}
              >
                <Input
                  {...register('salesTax', { required: true, pattern: /^[0-9.-]+$/g })}
                  id="edit-baseline-current-charge"
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
              <div className="baseline-field"></div>
              <div className="baseline-field"></div>
              <div className="baseline-field"></div>
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
