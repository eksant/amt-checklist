const redis = require('redis')
const client = redis.createClient()

const { create, read, readId, update, destroy } = require('../../models/checklist')

module.exports = {
  create: (req, res) => {
    create(
      {
        user: req.decoded._id,
        mobiltangki: req.body.mobiltangkiId,
        status: req.body.status,
        ritase: req.body.ritase || null,
        odoKM: req.body.odoKM || null,
        HSSE: req.body.HSSE || null,
        PWSAMT: req.body.PWSAMT || null,
        TBBM: req.body.TBBM || null,
        remarks: req.body.remarks || null,
        imgUrl: req.body.imgUrl || null,
        kondisiRem: req.body.kondisiRem || null,
        kondisiRemReason: req.body.kondisiRemReason || null,
        kondisiBan: req.body.kondisiBan || null,
        kondisiBanReason: req.body.kondisiBanReason || null,
        kondisiWiper: req.body.kondisiWiper || null,
        kondisiWiperReason: req.body.kondisiWiperReason || null,
        kondisiLampu: req.body.kondisiLampu || null,
        kondisiLampuReason: req.body.kondisiLampuReason || null,
        kondisiKompartemen: req.body.kondisiKompartemen || null,
        kondisiKompartemenReason: req.body.kondisiKompartemenReason || null,
        kondisiApar: req.body.kondisiApar || null,
        kondisiAparReason: req.body.kondisiAparReason || null,
        kondisiOliMesin: req.body.kondisiOliMesin || null,
        kondisiOliMesinReason: req.body.kondisiOliMesinReason || null,
        kondisiAirRadiator: req.body.kondisiAirRadiator || null,
        kondisiAirRadiatorReason: req.body.kondisiAirRadiatorReason || null,
        keberadaanSTNK: req.body.keberadaanSTNK || null,
        keberadaanSTNKReason: req.body.keberadaanSTNKReason || null,
        keberadaanSuratKeur: req.body.keberadaanSuratKeur || null,
        keberadaanSuratKeurReason: req.body.keberadaanSuratKeurReason || null,
        keberadaanSuratTera: req.body.keberadaanSuratTera || null,
        keberadaanSuratTeraReason: req.body.keberadaanSuratTeraReason || null,
        keberadaanP3K: req.body.keberadaanP3K || null,
        keberadaanP3KReason: req.body.keberadaanP3KReason || null,
        keberadaanFlameTrap: req.body.keberadaanFlameTrap || null,
        keberadaanFlameTrapReason: req.body.keberadaanFlameTrapReason || null,
        keberadaanBanSerep: req.body.keberadaanBanSerep || null,
        keberadaanBanSerepReason: req.body.keberadaanBanSerepReason || null,
        keberadaanToolkit: req.body.keberadaanToolkit || null,
        keberadaanToolKitReason: req.body.keberadaanToolKitReason || null,
        keberadaanGroundingCable: req.body.keberadaanGroundingCable || null,
        keberadaanGroundingCableReason: req.body.keberadaanGroundingCableReason || null,
        keberadaanSelangBongkar: req.body.keberadaanSelangBongkar || null,
        keberadaanSelangBongkarReason: req.body.keberadaanSelangBongkarReason || null,
        keberadaanSpillKit: req.body.keberadaanSpillKit || null,
        keberadaanSpillKitReason: req.body.keberadaanSpillKitReason || null,
        membawaSIM: req.body.membawaSIM || null,
        membawaSIMReason: req.body.membawaSIMReason || null,
        membawaSuratIjinArea: req.body.membawaSuratIjinArea || null,
        membawaSuratIjinAreaReason: req.body.membawaSuratIjinAreaReason || null,
        membawaBukuSaku: req.body.membawaBukuSaku || null,
        membawaBukuSakuReason: req.body.membawaBukuSakuReason || null,
        membawaCatatanPerjalanan: req.body.membawaCatatanPerjalanan || null,
        membawaCatatanPerjalananReason: req.body.membawaCatatanPerjalananReason || null,
        menggunakanSeragam: req.body.menggunakanSeragam || null,
        menggunakanSeragamReason: req.body.menggunakanSeragamReason || null,
        menggunakanSafetyShoes: req.body.menggunakanSafetyShoes || null,
        menggunakanSafetyShoesReason: req.body.menggunakanSafetyShoesReason || null,
        menggunakanSafetyHelm: req.body.menggunakanSafetyHelm || null,
        menggunakanSafetyHelmReason: req.body.menggunakanSafetyHelmReason || null,
        menggunakanIDCard: req.body.menggunakanIDCard || null,
        menggunakanIDCardReason: req.body.menggunakanIDCardReason || null,
        menggunakanSarungTangan: req.body.menggunakanSarungTangan || null,
        menggunakanSarungTanganReason: req.body.menggunakanSarungTanganReason || null,
        menggunakanJasHujan: req.body.menggunakanJasHujan || null,
        menggunakanJamHujanReason: req.body.menggunakanJamHujanReason || null,
      },
      (error, data) => {
        if (!error) {
          client.del('checklistCache')
          res.status(200).json({
            message: 'Success to insert record',
            data,
          })
        } else {
          res.status(400).json({
            message: 'Bad request',
            error,
          })
        }
      }
    )
  },

  read: (req, res) => {
    read((error, data) => {
      if (!error) {
        client.set('checklistCache', JSON.stringify(data), 'EX', 500)
        res.status(200).json({
          data,
        })
      } else {
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },

  readById: (req, res) => {
    readId(req.params.id, (error, data) => {
      if (!error) {
        client.set('checklistCache', JSON.stringify(data), 'EX', 500)
        res.status(200).json({
          data,
        })
      } else {
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },

  update: (req, res) => {
    readId(req.params.id, (error, checklist) => {
      if (checklist) {
        update(
          req.params.id,
          {
            // user: req.decoded.userId,
            mobiltangki: req.body.mobiltangkiId || checklist[0].mobiltangki.id,
            status: req.body.status || checklist[0].status,
            ritase: req.body.ritase || checklist[0].ritase,
            odoKM: req.body.odoKM || checklist[0].odoKM,
            HSSE: req.body.HSSE || checklist[0].HSSE,
            PWSAMT: req.body.PWSAMT || checklist[0].PWSAMT,
            TBBM: req.body.TBBM || checklist[0].TBBM,
            remarks: req.body.remarks || checklist[0].remarks,
            imgUrl: req.body.imgUrl || checklist[0].imgUrl,
            kondisiRem: req.body.kondisiRem || checklist[0].kondisiRem,
            kondisiRemReason: req.body.kondisiRemReason || checklist[0].kondisiRemReason,
            kondisiBan: req.body.kondisiBan || checklist[0].kondisiBan,
            kondisiBanReason: req.body.kondisiBanReason || checklist[0].kondisiBanReason,
            kondisiWiper: req.body.kondisiWiper || checklist[0].kondisiWiper,
            kondisiWiperReason: req.body.kondisiWiperReason || checklist[0].kondisiWiperReason,
            kondisiLampu: req.body.kondisiLampu || checklist[0].kondisiLampu,
            kondisiLampuReason: req.body.kondisiLampuReason || checklist[0].kondisiLampuReason,
            kondisiKompartemen: req.body.kondisiKompartemen || checklist[0].kondisiKompartemen,
            kondisiKompartemenReason:
              req.body.kondisiKompartemenReason || checklist[0].kondisiKompartemenReason,
            kondisiApar: req.body.kondisiApar || checklist[0].kondisiApar,
            kondisiAparReason: req.body.kondisiAparReason || checklist[0].kondisiAparReason,
            kondisiOliMesin: req.body.kondisiOliMesin || checklist[0].kondisiOliMesin,
            kondisiOliMesinReason:
              req.body.kondisiOliMesinReason || checklist[0].kondisiOliMesinReason,
            kondisiAirRadiator: req.body.kondisiAirRadiator || checklist[0].kondisiAirRadiator,
            kondisiAirRadiatorReason:
              req.body.kondisiAirRadiatorReason || checklist[0].kondisiAirRadiatorReason,
            keberadaanSTNK: req.body.keberadaanSTNK || checklist[0].keberadaanSTNK,
            keberadaanSTNKReason:
              req.body.keberadaanSTNKReason || checklist[0].keberadaanSTNKReason,
            keberadaanSuratKeur: req.body.keberadaanSuratKeur || checklist[0].keberadaanSuratKeur,
            keberadaanSuratKeurReason:
              req.body.keberadaanSuratKeurReason || checklist[0].keberadaanSuratKeurReason,
            keberadaanSuratTera: req.body.keberadaanSuratTera || checklist[0].keberadaanSuratTera,
            keberadaanSuratTeraReason:
              req.body.keberadaanSuratTeraReason || checklist[0].keberadaanSuratTeraReason,
            keberadaanP3K: req.body.keberadaanP3K || checklist[0].keberadaanP3K,
            keberadaanP3KReason: req.body.keberadaanP3KReason || checklist[0].keberadaanP3KReason,
            keberadaanFlameTrap: req.body.keberadaanFlameTrap || checklist[0].keberadaanFlameTrap,
            keberadaanFlameTrapReason:
              req.body.keberadaanFlameTrapReason || checklist[0].keberadaanFlameTrapReason,
            keberadaanBanSerep: req.body.keberadaanBanSerep || checklist[0].keberadaanBanSerep,
            keberadaanBanSerepReason:
              req.body.keberadaanBanSerepReason || checklist[0].keberadaanBanSerepReason,
            keberadaanToolkit: req.body.keberadaanToolkit || checklist[0].keberadaanToolkit,
            keberadaanToolKitReason:
              req.body.keberadaanToolKitReason || checklist[0].keberadaanToolKitReason,
            keberadaanGroundingCable:
              req.body.keberadaanGroundingCable || checklist[0].keberadaanGroundingCable,
            keberadaanGroundingCableReason:
              req.body.keberadaanGroundingCableReason ||
              checklist[0].keberadaanGroundingCableReason,
            keberadaanSelangBongkar:
              req.body.keberadaanSelangBongkar || checklist[0].keberadaanSelangBongkar,
            keberadaanSelangBongkarReason:
              req.body.keberadaanSelangBongkarReason || checklist[0].keberadaanSelangBongkarReason,
            keberadaanSpillKit: req.body.keberadaanSpillKit || checklist[0].keberadaanSpillKit,
            keberadaanSpillKitReason:
              req.body.keberadaanSpillKitReason || checklist[0].keberadaanSpillKitReason,
            membawaSIM: req.body.membawaSIM || checklist[0].membawaSIM,
            membawaSIMReason: req.body.membawaSIMReason || checklist[0].membawaSIMReason,
            membawaSuratIjinArea:
              req.body.membawaSuratIjinArea || checklist[0].membawaSuratIjinArea,
            membawaSuratIjinAreaReason:
              req.body.membawaSuratIjinAreaReason || checklist[0].membawaSuratIjinAreaReason,
            membawaBukuSaku: req.body.membawaBukuSaku || checklist[0].membawaBukuSaku,
            membawaBukuSakuReason:
              req.body.membawaBukuSakuReason || checklist[0].membawaBukuSakuReason,
            membawaCatatanPerjalanan:
              req.body.membawaCatatanPerjalanan || checklist[0].membawaCatatanPerjalanan,
            membawaCatatanPerjalananReason:
              req.body.membawaCatatanPerjalananReason ||
              checklist[0].membawaCatatanPerjalananReason,
            menggunakanSeragam: req.body.menggunakanSeragam || checklist[0].menggunakanSeragam,
            menggunakanSeragamReason:
              req.body.menggunakanSeragamReason || checklist[0].menggunakanSeragamReason,
            menggunakanSafetyShoes:
              req.body.menggunakanSafetyShoes || checklist[0].menggunakanSafetyShoes,
            menggunakanSafetyShoesReason:
              req.body.menggunakanSafetyShoesReason || checklist[0].menggunakanSafetyShoesReason,
            menggunakanSafetyHelm:
              req.body.menggunakanSafetyHelm || checklist[0].menggunakanSafetyHelmReason,
            menggunakanSafetyHelmReason:
              req.body.menggunakanSafetyHelmReason || checklist[0].menggunakanSafetyHelmReason,
            menggunakanIDCard: req.body.menggunakanIDCard || checklist[0].menggunakanIDCard,
            menggunakanIDCardReason:
              req.body.menggunakanIDCardReason || checklist[0].menggunakanIDCardReason,
            menggunakanSarungTangan:
              req.body.menggunakanSarungTangan || checklist[0].menggunakanSarungTangan,
            menggunakanSarungTanganReason:
              req.body.menggunakanSarungTanganReason || checklist[0].menggunakanSarungTanganReason,
            menggunakanJasHujan: req.body.menggunakanJasHujan || checklist[0].menggunakanJasHujan,
            menggunakanJamHujanReason:
              req.body.menggunakanJamHujanReason || checklist[0].menggunakanJasHujan,
          },
          (error, data) => {
            if (!error) {
              client.del('checklistCache')
              res.status(200).json({
                message: 'Success to update record!',
                data,
              })
            } else {
              res.status(400).json({
                message: 'Bad request',
                error,
              })
            }
          }
        )
      } else {
        res.status(400).json({
          message: 'Data not found!',
          error,
        })
      }
    })
  },

  destroy: (req, res) => {
    destroy(req.params.id, error => {
      if (!error) {
        client.del('checklistCache')
        res.status(200).json({
          message: 'Success to delete record!',
        })
      } else {
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },
}
