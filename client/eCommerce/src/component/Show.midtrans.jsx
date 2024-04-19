
const handleDonate = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + "/generate-midtrans",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // Panggil window.snap.pay setelah permintaan berhasil
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("payment success!");
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("waiting for your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  }