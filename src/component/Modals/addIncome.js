import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";

// AddIncomeModal component for adding income through a modal form
const AddIncomeModal = ({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) => {
  // Form hook from Ant Design to manage form state
  const [form] = Form.useForm();
  return (
    <>
      {/* Modal component for adding income */}
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        {/* Form for capturing income details */}
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            // Handle form submission, reset the fields, and pass values to onFinish function
            onFinish(values, "income");
            form.resetFields();
          }}
        >
          {/* Form Item for capturing the name of the income */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name of the transaction!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>

          {/* Form Item for capturing the amount of the income */}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the income amount!",
              },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>

          {/* Form Item for capturing the date of the income */}
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select the income date!",
              },
            ]}
          >
            <DatePicker type="date" className="custom-input" />
          </Form.Item>

          {/* Form Item for capturing the tag of the income */}
          <Form.Item
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "Please select a tag!",
              },
            ]}
          >
            <Select className="select-input-2">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </Select>
          </Form.Item>

          {/* Form Item for the submit button */}
          <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddIncomeModal;
