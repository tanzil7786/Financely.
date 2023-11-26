import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";

const AddExpenseModal = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  // Form hook from Ant Design to manage form state
  const [form] = Form.useForm();
  return (
    <>
      {/* Modal component for adding an expense */}
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        {/* Form for capturing expense details */}
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            // Handle form submission, reset the fields, and pass values to onFinish function
            onFinish(values, "expense");
            form.resetFields();
          }}
        >
          {/* Form Item for capturing the name of the expense */}
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

          {/* Form Item for capturing the amount of the expense */}
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the expense amount!",
              },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>

          {/* Form Item for capturing the date of the expense */}
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select the date of the transaction!",
              },
            ]}
          >
            <DatePicker
              type="text"
              className="custom-input"
              format="YYYY-MM-DD"
              picker="data"
            />
          </Form.Item>

          {/* Form Item for capturing the tag of the expense */}
          <Form.Item
            label="Tag"
            name="tag"
            rules={[{ required: true, message: "Please select a tag!" }]}
          >
            <Select className="select-input-2">
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="office">Office</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
            </Select>
          </Form.Item>

          {/* Form Item for the submit button */}
          <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddExpenseModal;
