import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const paymentCounter = useRef(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const shippingCost = 10;
  const totalAmount = getCartTotal() + shippingCost;
  const nairaAmount = totalAmount * 1500;

  const handlePayment = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill in all required fields');
      return;
    }

    paymentCounter.current = paymentCounter.current + 1;
    const timestamp = new Date().getTime();
    const uniqueRef = `ORDER_${timestamp}_${paymentCounter.current}`;

    let paymentCompleted = false;

    window.FlutterwaveCheckout({
      public_key: 'FLWPUBK_TEST-6d5974022d49b0e8eae62aedb2f68143-X',
      tx_ref: uniqueRef,
      amount: nairaAmount,
      currency: 'NGN',
      payment_options: 'card,banktransfer,ussd,mobilemoney',
      customer: {
        email: formData.email,
        phone_number: formData.phone,
        name: formData.fullName,
      },
      customizations: {
        title: 'Fashion Store',
        description: `Payment for order ${uniqueRef}`,
        logo: '/fashion-logo.png',
      },
      callback: function (data) {
        console.log('Payment callback triggered!', data);
        paymentCompleted = true;

        if (data.status === 'successful') {
          const modal = document.querySelector('.flutterwave-modal, [class*="flw-modal"]');
          if (modal) modal.style.display = 'none';

          toast.success('Payment successful! Order confirmed! 🎉', { duration: 2000 });
          clearCart();

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          toast.error('Payment was not completed');
        }
      },
      onclose: function () {
        setTimeout(() => {
          if (!paymentCompleted) {
            toast.error('Payment cancelled. Please try again.', { icon: '❌' });
          }
        }, 500);
      },
    });
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.zipCode
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="08012345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Lagos"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="100001"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg transition font-medium text-lg ${isFormValid()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                disabled={!isFormValid()}
              >
                {isFormValid() ? 'Proceed to Payment' : 'Fill all fields to continue'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                🔒 Secure payment powered by Flutterwave
              </p>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.title.slice(0, 30)}...
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 text-center pt-2">
                ≈ ₦{nairaAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Payment Methods Available:</strong>
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>💳 Card Payment (Visa, Mastercard, Verve)</li>
                <li>🏦 Bank Transfer</li>
                <li>📱 USSD (*737#, *894#, etc)</li>
                <li>💰 Mobile Money (Opay, Kuda, Palmpay, etc.)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;