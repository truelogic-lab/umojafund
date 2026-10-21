import re


def normalize_kenyan_msisdn(raw):
    """
    Accepts:
      0712345678      -> 254712345678
      0112345678      -> 254112345678
      +254712345678   -> 254712345678
      254712345678    -> 254712345678
      254 712 345 678 -> 254712345678
      0712 345 678    -> 254712345678

    Rejects:
      254102776095    (landline/unallocated range)
      25470000000     (too short)
      0812345678      (invalid prefix)
    """
    if not raw:
        raise ValueError('Phone number is required.')

    digits = re.sub(r'\D', '', str(raw))

    if digits.startswith('254'):
        msisdn = digits
    elif digits.startswith('0'):
        msisdn = '254' + digits[1:]
    elif digits.startswith('7') or digits.startswith('1'):
        msisdn = '254' + digits
    else:
        raise ValueError('Phone number must be a Kenyan number starting with 07 or 01.')

    if len(msisdn) != 12:
        raise ValueError('Phone number must be 12 digits (e.g. 254712345678).')

    # Valid Kenyan mobile prefixes:
    #   254 7XX XXX XXX  (Safaricom/Airtel/Telkom 07)
    #   254 11X XXX XXX  (Safaricom 011 range only — not 25410)
    valid_mobile = re.fullmatch(r'254(7\d{8}|11\d{7})', msisdn)

    if not valid_mobile:
        if msisdn[3:5] == '10':
            raise ValueError(
                '25410 is a landline/unallocated range. Use a mobile number starting with 07 or 011.'
            )
        raise ValueError(
            'Invalid Kenyan mobile number. Use a number starting with 07 or 011.'
        )

    return msisdn
