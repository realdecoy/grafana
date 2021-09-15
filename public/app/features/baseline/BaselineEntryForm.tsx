import React, { FC } from 'react';
import { format } from 'date-fns';
import { Button, DatePickerWithInput, Field, FieldSet, Form, Icon, Input, Tooltip } from '@grafana/ui';
import config from 'app/core/config';
import { BaselineEntryFields } from './types';

const DATE_FORMAT = 'yyyy-MM-dd';

export interface Props {
  isSavingBaselineEntry: boolean;
  addBaselineEntry: (payload: BaselineEntryFields) => void;
}

const { disableLoginForm } = config;

export const BaselineEntryForm: FC<Props> = ({ isSavingBaselineEntry, addBaselineEntry }) => {
  const onSubmitBaselineEntry = (data: BaselineEntryFields) => {
    addBaselineEntry(data);
    clearForm();
  };
  const clearForm = () => {
    (document.getElementById('baseline-entry-form') as HTMLInputElement & {
      reset: () => boolean;
    }).reset();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    onSubmitBaselineEntry(data);
  };

  return (
    <Form id="baseline-entry-form" className="baseline-entry-form" onSubmit={onSubmit} validateOn="onBlur">
      {({ register, errors, clearErrors, setValue }) => {
        return (
          <FieldSet className="baseline-field-set">
            <div className="baseline-field-group">
              <Field
                className="baseline-field"
                label="Start Date"
                invalid={!!errors.startDate}
                error="Start Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="edit-baseline-start-date"
                  placeholder="Start Date"
                  closeOnSelect={true}
                  {...register('startDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('edit-baseline-start-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('startDate', formattedValue, { shouldValidate: true });
                  }}
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
              <Field
                className="baseline-field"
                label="End Date"
                invalid={!!errors.endDate}
                error="End Date is required [format: yyyy-mm-dd]"
                disabled={isSavingBaselineEntry}
              >
                <DatePickerWithInput
                  id="edit-baseline-end-date"
                  placeholder="End Date"
                  closeOnSelect={true}
                  {...register('endDate', { required: true, pattern: /\d{4}\-\d{2}\-\d{2}/g })}
                  onChange={(val) => {
                    const formattedValue = format(new Date(val.toString()), DATE_FORMAT);
                    const el = document.getElementById('edit-baseline-end-date') as HTMLInputElement;
                    el.value = formattedValue;
                    setValue('endDate', formattedValue, { shouldValidate: true });
                  }}
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
            </div>
            <div className="baseline-field-group">
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
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
                  defaultValue={''}
                  suffix={<InputSuffix />}
                />
              </Field>
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

export default BaselineEntryForm;

const InputSuffix: FC = () => {
  return disableLoginForm ? (
    <Tooltip content="Login details locked because they are managed in another system.">
      <Icon name="lock" />
    </Tooltip>
  ) : null;
};
