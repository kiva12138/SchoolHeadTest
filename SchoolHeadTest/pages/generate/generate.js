// pages/generate/generate.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    currentImage: '',
    imageData: ''
  },

handleClick1: function (e) {
  this.savePhoto('../../image/head1.png')
},
handleClick2: function (e) {
  this.savePhoto('../../image/head2.png')
},
handleClick3: function (e) {
  this.savePhoto('../../image/head3.png')
},
handleClick4: function (e) {
  this.savePhoto('../../image/head4.png')
},
handleClick5: function (e) {
  this.savePhoto('../../image/head5.png')
},
handleClick6: function (e) {
  this.savePhoto('../../image/head6.png')
},
handleClick7: function (e) {
  this.savePhoto('../../image/head7.png')
},
handleClick8: function (e) {
  this.savePhoto('../../image/head8.png')
},
handleClick9: function (e) {
  this.savePhoto('../../image/head9.png')
},

  // 保存图片到相册
savePhoto: function(headpath) {
  let that = this
  wx.downloadFile({
    url: that.data.currentImage, 
    success (res) {
      wx.showLoading({
        title: '合成中......',
        mask: true
      })
      const ctx = wx.createCanvasContext("myCanvas", that)
      wx.getImageInfo({
        src: res.tempFilePath,
        success: function(res1) {
          console.log("头像", res1)
          // 直接绘制，使用于正方形边框
          // ctx.drawImage(res1.path, 0, 0, 100, 100)
          
          // 圆形绘制
          ctx.clearRect(0, 0, 120, 120);
          ctx.save();
          ctx.beginPath();
          ctx.arc(60, 60, 60, 0, Math.PI * 2, false);
          ctx.clip(); 
          ctx.drawImage(res1.path, 0, 0, 120, 120);
          ctx.restore();
          wx.getImageInfo({
            src: headpath,
            success: function(res2) {
              console.log("头像框", res2)
              ctx.drawImage(res2.path, 0, 0, 120, 120)
              ctx.draw()
              wx.hideLoading()
            },
            fail(res2) {
              wx.hideLoading()
              wx.showModal({
                title: '温馨提示',
                content: '头像框，请重试',
                showCancel: false
              })
            }
          })
        },
        fail(res1) {
          wx.hideLoading()
          wx.showModal({
            title: '温馨提示',
            content: '头像获取失败，请重试',
            showCancel: false
          })
        }
      })
    },
    fail (res){
      console.log(res)
    }
  })
},
handleSave: function () {
  wx.showLoading({
    title: '正在保存',
    mask: true
  })
  setTimeout(() => {
    var that = this
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function(res3) {
        let tempFilePath = res3.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.hideLoading()
            wx.showModal({
              title: '温馨提示',
              content: '图片保存成功，可在相册中查看',
              showCancel: false
            })
          },
          fail(res) {
            wx.hideLoading()
            wx.showModal({
              title: '温馨提示',
              content: '图片保存失败，请重试',
              showCancel: false
            })
          }
        })
      },
      fail: function(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存失败，请重试',
          showCancel: false
        })
      }
    }, that)
  },1500)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        currentImage: app.globalData.userInfo.avatarUrl
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          currentImage: res.userInfo.avatarUrl
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            currentImage: res.userInfo.avatarUrl
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.showLoading({
      title: '载入中......',
      mask: true
    })
    wx.downloadFile({
      url: that.data.currentImage, 
      success (res) {
        const ctx = wx.createCanvasContext("myCanvas", this)
        wx.getImageInfo({
          src: res.tempFilePath,
          success: function(res1) {
            ctx.drawImage(res1.path, 0, 0, 120, 120)
            ctx.draw(false)
          },
          fail (res1) {
            wx.showModal({
              title: '温馨提示',
              content: '头像获取失败，请重试',
              showCancel: false
            })
          }
        })
      },
      fail (res) {
        wx.showModal({
          title: '温馨提示',
          content: '头像获取失败，请重试',
          showCancel: false
        })
      }
    })
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})